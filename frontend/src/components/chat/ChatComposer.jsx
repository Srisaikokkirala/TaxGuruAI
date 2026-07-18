import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import Button from '@/components/ui/Button';
import PdfUploadButton from '@/components/chat/PdfUploadButton';
import { useChat } from '@/context/ChatContext';

export default function ChatComposer({ onSend, onStop, disabled = false, loading = false }) {
  const { activeChatId } = useChat();
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function sendCurrentMessage() {
    const cleanValue = value.trim();
    if (!cleanValue || disabled || loading) return;
    onSend(cleanValue);
    setValue('');
    textareaRef.current?.focus();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendCurrentMessage();
    }
  }

  return (
    <div className="border-t border-ink-800 bg-ink-950 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-xl border border-ink-800 bg-ink-900/40 p-3 shadow-sm">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Indian Income Tax, deductions, ITR, regime comparison, or calculations..."
          rows={3}
          className="min-h-[84px] w-full resize-none rounded-lg border border-ink-800 bg-ink-950/80 px-4 py-3 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-450">Press Enter to send, Shift+Enter for a new line.</p>

          <div className="flex items-center gap-2">
            <PdfUploadButton chatId={activeChatId} />
            {loading ? (
              <Button variant="secondary" size="sm" onClick={onStop}>
                <Square size={14} />
                Stop generation
              </Button>
            ) : null}
            <Button 
              onClick={sendCurrentMessage} 
              disabled={!value.trim() || disabled || loading}
              className="min-w-[140px] px-8 bg-gradient-to-r from-accent-600 to-indigo-600 hover:from-accent-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] transition-all duration-150 font-bold"
            >
              <ArrowUp size={16} />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
