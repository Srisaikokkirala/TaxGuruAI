import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import NameSetupScreen from './NameSetupScreen';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-350">Restoring your session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the display name is generic/placeholder (e.g. starts with user_ or is equal to username)
  const isGenericName =
    !user?.displayName ||
    user.displayName === 'User' ||
    user.displayName === 'TaxGuru User' ||
    user.displayName === user.clerkUserId ||
    user.displayName === user.username ||
    user.displayName.startsWith('user_') ||
    /^\+?[0-9\s\-()]{7,}$/.test(user.displayName);

  if (isGenericName) {
    return <NameSetupScreen />;
  }

  return children;
}
