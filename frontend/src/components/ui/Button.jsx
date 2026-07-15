import clsx from 'clsx';

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-accent-600 text-white shadow-md hover:bg-accent-700 active:bg-accent-800',
    secondary:
      'bg-ink-850 text-slate-100 border border-ink-800 hover:bg-ink-800 hover:text-white',
    ghost: 'bg-transparent text-slate-300 hover:bg-ink-850 hover:text-white',
    danger: 'bg-rose-950/20 text-rose-300 border border-rose-900/40 hover:bg-rose-950/40 hover:text-rose-200',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-sm rounded-xl',
    md: 'px-4.5 py-2.5 text-sm rounded-xl',
    lg: 'px-5.5 py-3 text-base rounded-xl',
  };

  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
