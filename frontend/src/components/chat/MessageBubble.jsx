import { Check, Copy, ThumbsDown, ThumbsUp, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import MarkdownRenderer from './MarkdownRenderer';
import { formatTime } from '@/utils/formatDate';
import Button from '@/components/ui/Button';

export default function MessageBubble({
  message,
  isLatestAssistant = false,
  onRegenerate,
  onFeedback,
  showTimestamps = true,
}) {
  const isAssistant = message.role === 'assistant';

  async function copyMessage() {
    await navigator.clipboard.writeText(message.content);
    toast.success('Message copied.');
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`group max-w-[92%] rounded-xl border px-4.5 py-3.5 shadow-sm sm:max-w-[80%] ${
          isAssistant
            ? 'border-ink-800 bg-ink-900/40 text-slate-100'
            : 'border-accent-700/20 bg-accent-600 text-white'
        }`}
      >
        {isAssistant ? (
          <div className="space-y-4">
            <MarkdownRenderer content={message.content} />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-800 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                {showTimestamps && <span>{formatTime(message.createdAt)}</span>}
                {message.feedback && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-ink-800 bg-ink-950/60 px-2 py-1 text-xs text-slate-300">
                    <Check size={12} /> {message.feedback}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <button
                  className="rounded-lg border border-ink-800 bg-ink-950/60 p-2 text-slate-300 hover:bg-ink-850 hover:text-white transition-colors"
                  onClick={copyMessage}
                  title="Copy"
                >
                  <Copy size={14} />
                </button>
                <button
                  className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-2 text-emerald-400 hover:bg-emerald-950/45 hover:border-emerald-800 hover:text-emerald-300 transition-colors"
                  onClick={() => onFeedback?.(message.id, 'like')}
                  title="Like"
                >
                  <ThumbsUp size={14} />
                </button>
                <button
                  className="rounded-lg border border-rose-900/40 bg-rose-950/20 p-2 text-rose-450 hover:bg-rose-950/45 hover:border-rose-800 hover:text-rose-300 transition-colors"
                  onClick={() => onFeedback?.(message.id, 'dislike')}
                  title="Dislike"
                >
                  <ThumbsDown size={14} />
                </button>
                {isLatestAssistant && (
                  <button
                    className="rounded-lg border border-ink-800 bg-ink-950/60 p-2 text-slate-300 hover:bg-ink-850 hover:text-white transition-colors"
                    onClick={() => onRegenerate?.()}
                    title="Regenerate"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="whitespace-pre-wrap text-[15px] leading-7 text-white font-medium">{message.content}</p>
            {showTimestamps && (
              <p className="text-right text-xs text-blue-100/80">{formatTime(message.createdAt)}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
