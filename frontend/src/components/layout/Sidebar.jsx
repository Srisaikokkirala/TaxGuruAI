import { AnimatePresence, motion } from 'framer-motion';
import { Layers3, MessageSquarePlus, Settings2, Trash2, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import Toggle from '@/components/ui/Toggle';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { formatDateTime } from '@/utils/formatDate';
import clsx from 'clsx';
import { useState } from 'react';

export default function Sidebar({ open = false, onClose }) {
  const { user, logout } = useAuth();
  const {
    chats,
    activeChatId,
    isChatsLoading,
    settings,
    setSettings,
    startNewChat,
    openChat,
    clearAllChats,
  } = useChat();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">TaxGuru AI</p>
          <p className="text-xs text-slate-400">Conversation workspace</p>
        </div>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-slate-200 lg:hidden"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <Button className="w-full" onClick={startNewChat}>
        <MessageSquarePlus size={18} />
        New Chat
      </Button>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Conversation History
          </h3>
          <Layers3 size={14} className="text-slate-500" />
        </div>

        <div className="max-h-[42vh] space-y-2 overflow-y-auto pr-1">
          {isChatsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : chats.length ? (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => openChat(chat.id)}
                className={clsx(
                  'w-full rounded-xl border px-4 py-3 text-left transition-all duration-150',
                  activeChatId === chat.id
                    ? 'border-accent-500/40 bg-accent-600/10 text-white shadow-sm'
                    : 'border-ink-800 bg-ink-900/40 hover:bg-ink-850 hover:border-ink-700/50'
                )}
              >
                <p className="line-clamp-2 text-sm font-medium text-white">{chat.title}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{chat.messageCount} messages</span>
                  <span>{formatDateTime(chat.lastMessageAt)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-ink-800 bg-ink-900/30 p-4 text-sm text-slate-400">
              No chats yet. Start a tax question to create your first conversation.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <button
          onClick={() => setSettingsOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl border border-ink-800 bg-ink-900/40 px-4 py-3 text-left text-sm text-slate-200 hover:bg-ink-850 hover:border-ink-750 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Settings2 size={16} /> Settings
          </span>
          <span className="text-xs text-slate-500">{settingsOpen ? 'Hide' : 'Show'}</span>
        </button>

        <button
          onClick={clearAllChats}
          className="flex w-full items-center justify-between rounded-xl border border-rose-900/40 bg-rose-950/20 px-4 py-3 text-sm text-rose-300 transition hover:bg-rose-950/45 hover:border-rose-800"
        >
          <span className="flex items-center gap-2">
            <Trash2 size={16} /> Clear Chats
          </span>
          <span className="text-xs text-rose-400/80">Reset</span>
        </button>
      </div>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-3 rounded-xl border border-ink-800 bg-ink-900/30 p-4"
          >
            <p className="text-sm font-semibold text-white">Settings</p>
            <Toggle
              label="Show timestamps"
              checked={settings.showTimestamps}
              onChange={(value) => setSettings((current) => ({ ...current, showTimestamps: value }))}
            />
            <Toggle
              label="Compact mode"
              checked={settings.compactMode}
              onChange={(value) => setSettings((current) => ({ ...current, compactMode: value }))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* User profile section at the bottom */}
      <div className="mt-auto pt-4 border-t border-ink-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-600/20 text-accent-400 font-bold border border-accent-500/20 text-sm">
            {user?.username ? user.username.slice(0, 2).toUpperCase() : (user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'U')}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">
              {user?.username || user?.displayName || 'User'}
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {user?.phoneNumber || 'Logged in'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-900/35 bg-rose-950/20 text-rose-300 hover:bg-rose-950/45 hover:text-rose-200 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="h-full hidden w-[360px] flex-shrink-0 flex-col gap-5 border-r border-ink-800 bg-ink-950 p-5 lg:flex">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -380 }}
            animate={{ x: 0 }}
            exit={{ x: -380 }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] border-r border-ink-800 bg-ink-950 p-5 shadow-2xl lg:hidden"
          >
            <div className="flex h-full flex-col gap-5">{sidebarContent}</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
