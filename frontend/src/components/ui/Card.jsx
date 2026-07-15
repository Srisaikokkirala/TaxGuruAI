import clsx from 'clsx';

export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-ink-800 bg-ink-900/50 p-6 shadow-sm transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}
