import { Menu, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';

export default function TopBar({ onMenuClick, showMenuButton = false }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { setIsCalculatorOpen } = useChat();
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive ? 'bg-ink-850 text-white border border-ink-800/40' : 'text-slate-300 hover:bg-ink-850/50 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-slate-100 lg:hidden"
            >
              <Menu size={18} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600 text-white shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">TaxGuru AI</p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">Professional tax guidance</p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/chat" className={linkClass}>
            Chat
          </NavLink>
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-ink-850/50 hover:text-white transition flex items-center gap-1.5"
          >
            Tax Calculator
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3.5">
              {/* User Avatar */}
              <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600/20 text-accent-400 font-bold border border-accent-500/20 text-sm overflow-hidden hover:scale-105 transition-transform" title="View Profile">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} className="h-full w-full object-cover" alt="User Avatar" />
                ) : (
                  (() => {
                    const name = user?.displayName || user?.username || 'U';
                    const parts = name.trim().split(/\s+/);
                    if (parts.length >= 2) {
                      return (parts[0][0] + parts[1][0]).toUpperCase();
                    }
                    return parts[0].slice(0, 2).toUpperCase();
                  })()
                )}
              </Link>

              {/* Display Name Link */}
              <Link to="/profile" className="hidden text-xs font-semibold text-slate-300 hover:text-white sm:block transition-colors truncate max-w-[140px]" title="View Profile">
                {user?.displayName || user?.username || 'user'}
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-900/30 bg-rose-950/20 hover:bg-rose-950/45 hover:border-rose-900/60 px-4.5 py-2 text-sm font-semibold text-rose-350 shadow-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-7 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-accent-700 active:bg-accent-800"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
