import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SignIn } from '@clerk/clerk-react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/chat';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-hero-grid px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
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
          <p className="mt-1 text-sm text-slate-400">Professional Indian Income Tax Guidance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 25 }}
          className="w-full"
        >
          <SignIn
            routing="virtual"
            appearance={{
              variables: {
                colorPrimary: '#8b5cf6', // Violet color to match violet/indigo theme
                colorBackground: '#0b0f19', // Sleek dark mode card matching bg-ink-950
                colorText: '#ffffff',
                colorTextSecondary: '#94a3b8',
                colorInputBackground: '#030712',
                colorInputText: '#ffffff',
                colorBorder: '#1e293b',
              },
              elements: {
                card: 'bg-ink-950/60 backdrop-blur-xl border border-white/10 shadow-glow rounded-3xl p-6',
                headerTitle: 'text-white text-2xl font-bold font-sans hidden', // we hide it since we have our custom header above
                headerSubtitle: 'text-slate-400 font-sans hidden', // hide it
                header: 'hidden', // hides header block
                formButtonPrimary: 'bg-gradient-to-r from-accent-600 to-indigo-650 hover:from-accent-700 hover:to-indigo-700 text-white font-semibold rounded-2xl py-3.5 border-0 shadow-md transition-all active:scale-[0.98]',
                formFieldInput: 'bg-ink-950/60 border border-slate-800 focus:border-accent-500 rounded-2xl text-white py-3.5',
                footerActionLink: 'text-accent-400 hover:text-accent-300 font-semibold',
                formFieldLabel: 'text-slate-350 font-semibold uppercase tracking-wider text-xs',
                identityPreviewText: 'text-white',
                identityPreviewEditButtonIcon: 'text-slate-300',
                otpCodeFieldInput: 'bg-ink-950/60 border border-slate-800 text-white rounded-xl font-bold text-lg focus:border-accent-500',
                dividerText: 'text-slate-400 font-medium',
                dividerLine: 'bg-slate-800',
                footer: 'bg-transparent text-slate-450 border-t border-white/5 pt-4 mt-2',
                footerActionText: 'text-slate-400',
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
