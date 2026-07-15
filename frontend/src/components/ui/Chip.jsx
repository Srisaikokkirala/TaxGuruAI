import clsx from 'clsx';

export default function Chip({ children, active = false, className = '', ...props }) {
  return (
    <button
      type="button"
      className={clsx(
        'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150',
        active
          ? 'border-accent-500/40 bg-accent-600/10 text-accent-300'
          : 'border-ink-800 bg-ink-900/60 text-slate-300 hover:bg-ink-800 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
