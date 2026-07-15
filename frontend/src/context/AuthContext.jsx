import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded: authLoaded, isSignedIn, getToken, signOut } = useClerkAuth();
  const { user: clerkUser, isLoaded: userLoaded } = useClerkUser();
  const [dbUser, setDbUser] = useState(null);
  const [isLoadingDb, setIsLoadingDb] = useState(true);

  // Setup request interceptor to attach Clerk Token dynamically
  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error("Error setting Clerk auth header:", err);
        }
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(interceptor);
    };
  }, [isSignedIn, getToken]);

  // Sync / fetch dbUser when isSignedIn changes
  useEffect(() => {
    async function syncUser() {
      if (!isSignedIn) {
        setDbUser(null);
        setIsLoadingDb(false);
        return;
      }

      setIsLoadingDb(true);
      try {
        const response = await apiClient.get('/auth/me');
        setDbUser(response.data.user);
      } catch (error) {
        console.error('Failed to sync user session with backend:', error);
      } finally {
        setIsLoadingDb(false);
      }
    }

    if (authLoaded) {
      syncUser();
    }
  }, [isSignedIn, authLoaded]);

  const isLoading = !authLoaded || !userLoaded || (isSignedIn && isLoadingDb);

  const logout = async () => {
    localStorage.removeItem('taxguru-active-chat');
    await signOut();
  };

  // Construct the unified user object compatible with frontend
  const user = clerkUser ? {
    id: clerkUser.id,
    clerkUserId: clerkUser.id,
    phoneNumber: clerkUser.primaryPhoneNumber?.phoneNumber || '',
    username: clerkUser.username || clerkUser.primaryPhoneNumber?.phoneNumber || clerkUser.id,
    displayName: clerkUser.firstName 
      ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() 
      : (dbUser?.displayName || clerkUser.username || clerkUser.primaryPhoneNumber?.phoneNumber || 'User'),
    provider: 'clerk',
    createdAt: clerkUser.createdAt,
    ...dbUser
  } : null;

  const updateDisplayName = async (newDisplayName) => {
    try {
      const response = await apiClient.put('/auth/profile', { displayName: newDisplayName });
      setDbUser(response.data.user);
      return { success: true };
    } catch (err) {
      console.error("Failed to update profile name:", err);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: isSignedIn ? 'clerk_session_active' : null,
        isAuthenticated: isSignedIn,
        isLoading,
        logout,
        updateDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
