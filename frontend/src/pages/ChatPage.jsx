import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/layout/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { useChat } from '@/context/ChatContext';

export default function ChatPage() {
  const { sidebarOpen, setSidebarOpen, submitMessage, messages } = useChat();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    // If navigated with an initial message, submit it once when chat is empty
    const initial = location?.state?.initialMessage;
    if (initial !== undefined && initial !== null) {
      if (initial && (!messages || messages.length === 0)) {
        submitMessage(initial);
      }
      // Replace state to clear initialMessage so it doesn't trigger again on Clear / New Chat
      navigate(location.pathname, { replace: true, state: { ...location.state, initialMessage: undefined } });
    }
  }, [location, submitMessage, messages, navigate]);

  return (
    <div className="flex h-screen w-full flex-col bg-ink-950">
      <TopBar showMenuButton onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <button
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
        <ChatWindow />
      </div>
    </div>
  );
}
