import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import RegimesPage from '@/pages/RegimesPage';
import ItrPage from '@/pages/ItrPage';
import ConceptsPage from '@/pages/ConceptsPage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import TopBar from '@/components/layout/TopBar';
import { useAuth } from '@/context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col">
      <TopBar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel max-w-md w-full rounded-3xl border border-white/10 p-8 shadow-glow bg-ink-900/40 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 via-indigo-500 to-purple-600 rounded-t-3xl"></div>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">User Profile</h2>
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-600/20 text-accent-400 font-bold border border-accent-500/20 text-3xl">
              {(() => {
                const name = user?.displayName || user?.username || 'U';
                const parts = name.trim().split(/\s+/);
                if (parts.length >= 2) {
                  return (parts[0][0] + parts[1][0]).toUpperCase();
                }
                return parts[0].slice(0, 2).toUpperCase();
              })()}
            </div>
            <p className="text-xl font-bold text-white">{user?.displayName || 'User'}</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-450">Username</label>
              <p className="text-sm font-medium text-slate-200 mt-1">{user?.username || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-450">Phone Number</label>
              <p className="text-sm font-medium text-slate-200 mt-1">{user?.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-450">Clerk User ID</label>
              <p className="text-xs font-medium text-slate-450 font-mono mt-1 break-all">{user?.clerkUserId || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-450">Provider</label>
              <p className="text-sm font-medium text-slate-200 mt-1 capitalize">{user?.provider || 'clerk'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col">
      <TopBar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel max-w-md w-full rounded-3xl border border-white/10 p-8 shadow-glow bg-ink-900/40 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 via-indigo-500 to-purple-600 rounded-t-3xl"></div>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Settings</h2>
          <p className="text-slate-400 text-sm text-center mb-6">Manage your TaxGuru AI settings</p>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-xl border border-ink-800 bg-ink-950/40">
              <div>
                <p className="text-sm font-semibold text-white">Active Session</p>
                <p className="text-xs text-slate-500 font-mono break-all">{user?.clerkUserId || 'Authenticated Session'}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-ink-800 bg-ink-950/40">
              <div>
                <p className="text-sm font-semibold text-white">Language</p>
                <p className="text-xs text-slate-400">English (India)</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-ink-800 bg-ink-950/40">
              <div>
                <p className="text-sm font-semibold text-white">Currency Representation</p>
                <p className="text-xs text-slate-400">INR (₹)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/regimes" element={<RegimesPage />} />
      <Route path="/itr" element={<ItrPage />} />
      <Route path="/concepts" element={<ConceptsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
