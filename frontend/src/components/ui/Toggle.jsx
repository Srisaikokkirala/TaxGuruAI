export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-ink-800 bg-ink-900/60 px-4 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span className="relative inline-flex h-7 w-12 cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-ink-800 transition-colors peer-checked:bg-accent-600" />
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
