import { motion } from 'framer-motion';
import { Bot, RotateCcw, Calculator } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { suggestedQuestions } from '@/utils/content';
import { useChat } from '@/context/ChatContext';
import useAutoScroll from '@/hooks/useAutoScroll';
import MessageBubble from './MessageBubble';
import ChatComposer from './ChatComposer';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import Skeleton from '@/components/ui/Skeleton';

export default function ChatWindow() {
  const {
    messages,
    activeChat,
    isConversationLoading,
    isGenerating,
    submitMessage,
    stopGeneration,
    regenerateResponse,
    setReaction,
    settings,
    setIsCalculatorOpen,
  } = useChat();

  const bottomRef = useAutoScroll([messages, isGenerating, isConversationLoading]);

  const latestAssistantId = [...messages].reverse().find((message) => message.role === 'assistant')?.id;

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="border-b border-ink-800 bg-ink-950/70 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Professional tax guidance</p>
            <h1 className="mt-1 text-xl font-semibold text-white">
              {activeChat?.title || 'AI Powered Tax Assistant'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsCalculatorOpen(true)}>
              <Calculator size={14} />
              Tax Calculator
            </Button>
            {messages.length > 0 && (
              <Button variant="secondary" size="sm" onClick={regenerateResponse}>
                <RotateCcw size={14} />
                Regenerate
              </Button>
            )}
            {isGenerating && (
              <Button variant="danger" size="sm" onClick={stopGeneration}>
                Stop generation
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {isConversationLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="ml-auto h-24 w-4/5" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : messages.length ? (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLatestAssistant={message.id === latestAssistantId}
                onRegenerate={regenerateResponse}
                onFeedback={setReaction}
                showTimestamps={settings.showTimestamps}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <Card className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-600 text-white">
                    <Bot size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Welcome to TaxGuru AI</p>
                    <p className="text-sm text-slate-400">Ask about Indian Income Tax in plain language.</p>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-slate-350">
                  I can help with tax regimes, deductions, ITR selection, TDS, PAN, AIS, and tax
                  calculations. If something is missing, I’ll ask follow-up questions first.
                </p>

                <SuggestedQuestions items={suggestedQuestions} onSelect={submitMessage} />
              </Card>

              <Card className="space-y-4">
                <p className="text-sm font-semibold text-white">How I behave</p>
                <ul className="space-y-3 text-sm leading-7 text-slate-300">
                  <li>• I answer only Indian Income Tax questions.</li>
                  <li>• I explain concepts in simple language.</li>
                  <li>• I ask follow-up questions when details are missing.</li>
                  <li>• I do not provide legal advice.</li>
                </ul>
              </Card>
            </motion.div>
          )}

          {isGenerating && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <ChatComposer onSend={submitMessage} onStop={stopGeneration} loading={isGenerating} />
    </div>
  );
}
