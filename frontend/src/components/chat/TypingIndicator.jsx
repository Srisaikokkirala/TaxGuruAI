import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-3 rounded-xl border border-ink-800 bg-ink-900/40 px-4 py-3 text-sm text-slate-350">
      <span className="h-2.5 w-2.5 rounded-full bg-accent-500 animate-pulse" />
      <span className="font-semibold text-white">TaxGuru AI is thinking</span>
      <div className="flex gap-1.5 ml-1">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: index * 0.15 }}
            className="h-1.5 w-1.5 rounded-full bg-accent-400"
          />
        ))}
      </div>
    </div>
  );
}
