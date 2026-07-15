import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  clearChats as clearChatsRequest,
  deleteChat as deleteChatRequest,
  getChat,
  getChats,
  sendChatMessage,
  setMessageFeedback,
} from '@/services/chatService';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAuth } from '@/context/AuthContext';

const ChatContext = createContext(null);

function normalizeMessage(message) {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    feedback: message.feedback || '',
    feedbackAt: message.feedbackAt || null,
    createdAt: message.createdAt,
  };
}

export function ChatProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useLocalStorage('taxguru-active-chat', '');
  const [settings, setSettings] = useLocalStorage('taxguru-settings', {
    showTimestamps: true,
    compactMode: false,
    accent: 'violet',
  });
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const abortRef = useRef(null);
  const snapshotRef = useRef([]);

  async function loadChats() {
    setIsChatsLoading(true);
    try {
      const response = await getChats();
      setChats(response.data.chats || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load chat history.');
    } finally {
      setIsChatsLoading(false);
    }
  }

  async function openChat(chatId) {
    if (!chatId) {
      setActiveChatId('');
      setMessages([]);
      return;
    }

    setActiveChatId(chatId);
    setIsConversationLoading(true);
    setSidebarOpen(false);

    try {
      const response = await getChat(chatId);
      setMessages((response.data.chat.messages || []).map(normalizeMessage));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load this conversation.');
    } finally {
      setIsConversationLoading(false);
    }
  }

  function startNewChat() {
    setActiveChatId('');
    setMessages([]);
    setSidebarOpen(false);
  }

  function stopGeneration() {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }

  async function persistChatsFromServer() {
    await loadChats();
  }

  async function submitMessage(message, options = {}) {
    const cleanMessage = String(message || '').trim();
    if (!cleanMessage && !options.regenerate) return;

    stopGeneration();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsGenerating(true);
    snapshotRef.current = messages;

    const userMessage = {
      id: `local-user-${Date.now()}`,
      role: 'user',
      content: cleanMessage,
      feedback: '',
      createdAt: new Date().toISOString(),
      pending: true,
    };
    const typingMessage = {
      id: `local-assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      pending: true,
      typing: true,
    };

    setMessages((current) =>
      options.regenerate ? [...current, typingMessage] : [...current, userMessage, typingMessage]
    );

    try {
      const response = await sendChatMessage(
        {
          message: cleanMessage,
          chatId: activeChatId || undefined,
          regenerate: Boolean(options.regenerate),
        },
        { signal: controller.signal }
      );

      if (response.data.needsTaxContext) {
        setMessages((current) => [
          ...(options.regenerate ? snapshotRef.current : current.filter((msg) => !msg.typing)),
          {
            id: `refusal-${Date.now()}`,
            role: 'assistant',
            content: response.data.reply,
            createdAt: new Date().toISOString(),
          },
        ]);
        toast('Tax-focused guidance only.', { icon: 'ℹ️' });
        return;
      }

      setActiveChatId(response.data.chatId);
      setMessages((response.data.messages || []).map(normalizeMessage));
      await persistChatsFromServer();
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        setMessages(snapshotRef.current);
        toast('Generation stopped.', { icon: '⏹️' });
      } else {
        setMessages(snapshotRef.current);
        toast.error(error?.response?.data?.message || 'Unable to generate a reply.');
      }
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }

  async function regenerateResponse() {
    if (!activeChatId) {
      toast.error('Open a chat before regenerating a reply.');
      return;
    }

    if (!messages.length) {
      toast.error('No message available to regenerate.');
      return;
    }

    await submitMessage('', { regenerate: true });
  }

  async function clearAllChats() {
    try {
      await clearChatsRequest();
      setChats([]);
      setMessages([]);
      setActiveChatId('');
      toast.success('All chats cleared.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to clear chats.');
    }
  }

  async function removeChat(chatId) {
    try {
      await deleteChatRequest(chatId);
      if (activeChatId === chatId) {
        setActiveChatId('');
        setMessages([]);
      }
      await persistChatsFromServer();
      toast.success('Chat removed.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to delete chat.');
    }
  }

  async function setReaction(messageId, feedback) {
    try {
      await setMessageFeedback(messageId, feedback);
      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? { ...message, feedback, feedbackAt: new Date().toISOString() }
            : message
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save feedback.');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadChats();
    } else {
      setChats([]);
      setMessages([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const restoreActiveChat = async () => {
      if (!isAuthenticated || !activeChatId) return;

      setIsConversationLoading(true);
      try {
        const response = await getChat(activeChatId);
        setMessages((response.data.chat.messages || []).map(normalizeMessage));
      } catch {
        setActiveChatId('');
        setMessages([]);
      } finally {
        setIsConversationLoading(false);
      }
    };

    restoreActiveChat();
  }, [isAuthenticated, activeChatId]);

  const triggerCalculatorAnalysis = async (summary) => {
    setIsCalculatorOpen(false);

    const formatCurr = (val) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(val);

    const prompt = `Please calculate and verify my Indian Income Tax for **FY ${summary.fy}**.

**My Financial Profile:**
- Employment Type: ${summary.employmentType}
- Age Category: ${summary.ageCategory}
- Gross Salary Income: ${formatCurr(summary.salaryIncome)}/year
- Other/Business Income: ${formatCurr(summary.otherIncome)}/year

**Deductions & Exemptions (Claimed for Old Regime):**
- Section 80C: ${formatCurr(summary.deductions80C)}
- Section 80D: ${formatCurr(summary.deductions80D)}
- HRA Exemption: ${formatCurr(summary.hraExempt)}
- Home Loan Interest (Sec 24b): ${formatCurr(summary.homeLoanInterest)}
- Other Deductions: ${formatCurr(summary.otherDeductions)}

**Estimated Local Calculations:**
- Old Regime Estimated Tax: ${formatCurr(summary.oldTax)}
- New Regime Estimated Tax: ${formatCurr(summary.newTax)}
- Recommended: ${summary.betterRegime} (Approx. Savings: ${formatCurr(summary.savings)})

Please:
1. Double-check these calculations using your knowledge of Indian income tax laws for FY ${summary.fy}.
2. Provide a slab-wise break-up of the taxable income and tax rates for both regimes.
3. Detail the standard deduction, rebates under Section 87A, and any marginal relief if applicable.
4. Give me 3 professional tax-saving recommendations suited to my profile.`;

    navigate('/chat');
    await submitMessage(prompt);
  };

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) || null,
    [activeChatId, chats]
  );

  const value = {
    chats,
    messages,
    activeChat,
    activeChatId,
    settings,
    setSettings,
    isChatsLoading,
    isConversationLoading,
    isGenerating,
    sidebarOpen,
    setSidebarOpen,
    startNewChat,
    openChat,
    submitMessage,
    regenerateResponse,
    stopGeneration,
    clearAllChats,
    removeChat,
    setReaction,
    loadChats,
    isCalculatorOpen,
    setIsCalculatorOpen,
    triggerCalculatorAnalysis,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider.');
  }

  return context;
}
