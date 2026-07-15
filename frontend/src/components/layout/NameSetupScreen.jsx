import React, { useState } from 'react';
import { User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function NameSetupScreen() {
  const { updateDisplayName, user } = useAuth();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a valid name.');
      return;
    }

    setIsSubmitting(true);
    const result = await updateDisplayName(name);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(`Welcome, ${name}!`);
    } else {
      toast.error(result.error || 'Failed to save name. Please try again.');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink-950 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden text-slate-200">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/10 blur-[80px]"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-[90px]"></div>

      <div className="w-full max-w-md z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-2"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-600 text-white shadow-lg shadow-accent-600/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">TaxGuru AI</h2>
          <p className="mt-1 text-sm text-slate-400">Complete your profile setup</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 25 }}
          className="w-full"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-panel rounded-3xl border border-white/10 p-8 bg-ink-900/40 shadow-glow relative space-y-6"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 via-indigo-500 to-purple-600 rounded-t-3xl"></div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white">What should we call you?</h3>
              <p className="mt-1 text-xs text-slate-400">
                Please enter your name to display on your profile and conversations.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your Full Name
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  disabled={isSubmitting}
                  className="block w-full rounded-2xl border border-slate-800 bg-ink-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-accent-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-600 to-indigo-650 hover:from-accent-700 hover:to-indigo-700 text-white font-semibold py-3.5 border-0 shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Get Started'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
