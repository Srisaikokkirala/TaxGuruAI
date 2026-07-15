import React, { useState } from 'react';
import { Key, Copy, Check, ExternalLink, ShieldAlert, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClerkSetupScreen() {
  const [copiedFrontend, setCopiedFrontend] = useState(false);
  const [copiedBackend, setCopiedBackend] = useState(false);

  const frontendEnvContent = `VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=TaxGuru AI`;

  const backendEnvContent = `PORT=5000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=http://localhost:5173
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile
CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY`;

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink-950 px-4 py-12 sm:px-6 lg:px-8 overflow-y-auto text-slate-200">
      {/* Background radial glows */}
      <div className="absolute top-10 left-1/4 h-[350px] w-[350px] rounded-full bg-accent-500/10 blur-[100px]"></div>
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]"></div>

      <div className="w-full max-w-2xl z-10 my-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg mb-4">
            <ShieldAlert size={36} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Clerk Setup Required</h1>
          <p className="mt-3 text-lg text-slate-400 max-w-md mx-auto">
            TaxGuru AI requires active Clerk Authentication keys to load successfully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 bg-ink-900/40 shadow-glow relative mb-6"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-t-3xl"></div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-amber-400/90 text-sm">
              <AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
              <div>
                <span className="font-semibold block mb-1">Why is this page showing?</span>
                We detected that your <code className="bg-ink-950 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">VITE_CLERK_PUBLISHABLE_KEY</code> is either missing, empty, or using the default placeholder value. To prevent React from crashing, we are showing this setup guide.
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Setup Instructions</h2>
              <div className="space-y-6 text-sm text-slate-350">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-600/20 text-accent-400 flex items-center justify-center font-bold text-xs">1</div>
                  <div>
                    <p className="font-semibold text-white">Create a Clerk Account</p>
                    <p className="mt-1">
                      Go to{' '}
                      <a
                        href="https://dashboard.clerk.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-400 hover:text-accent-300 inline-flex items-center gap-1 font-medium hover:underline"
                      >
                        Clerk Dashboard <ExternalLink size={12} />
                      </a>{' '}
                      to create a free account and start a new application.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-600/20 text-accent-400 flex items-center justify-center font-bold text-xs">2</div>
                  <div>
                    <p className="font-semibold text-white">Retrieve API Keys</p>
                    <p className="mt-1">
                      Navigate to the **Configure &gt; API Keys** section in your Clerk Dashboard and copy the **Publishable key** and **Secret key**.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-600/20 text-accent-400 flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <p className="font-semibold text-white">Update Environment Files</p>
                    <p className="mt-1">
                      Open the files below and replace the placeholders with your actual Clerk keys:
                    </p>

                    <div className="mt-4 space-y-4">
                      {/* Frontend Section */}
                      <div className="rounded-2xl bg-ink-950/80 border border-white/5 overflow-hidden">
                        <div className="flex justify-between items-center bg-ink-900/60 px-4 py-2 border-b border-white/5">
                          <span className="font-mono text-xs text-slate-400 font-semibold">frontend/.env</span>
                          <button
                            onClick={() => copyToClipboard(frontendEnvContent, setCopiedFrontend)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                            title="Copy sample content"
                          >
                            {copiedFrontend ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div className="p-3 font-mono text-xs text-slate-300 whitespace-pre-wrap break-all leading-relaxed">
                          VITE_CLERK_PUBLISHABLE_KEY=<span className="text-accent-400">pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY</span>
                          {"\n"}VITE_API_BASE_URL=http://localhost:5000
                        </div>
                      </div>

                      {/* Backend Section */}
                      <div className="rounded-2xl bg-ink-950/80 border border-white/5 overflow-hidden">
                        <div className="flex justify-between items-center bg-ink-900/60 px-4 py-2 border-b border-white/5">
                          <span className="font-mono text-xs text-slate-400 font-semibold">backend/.env</span>
                          <button
                            onClick={() => copyToClipboard(backendEnvContent, setCopiedBackend)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                            title="Copy sample content"
                          >
                            {copiedBackend ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div className="p-3 font-mono text-xs text-slate-300 whitespace-pre-wrap break-all leading-relaxed">
                          CLERK_PUBLISHABLE_KEY=<span className="text-accent-400">pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY</span>
                          {"\n"}CLERK_SECRET_KEY=<span className="text-indigo-400">sk_test_YOUR_ACTUAL_SECRET_KEY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-600/20 text-accent-400 flex items-center justify-center font-bold text-xs">4</div>
                  <div>
                    <p className="font-semibold text-white">Restart Servers</p>
                    <p className="mt-1">
                      Save the env files. If the changes do not load automatically, restart your backend and frontend terminal servers:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-850 border border-ink-800 text-xs font-mono text-slate-350">
                        npm run dev <span className="text-slate-500">(frontend)</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-850 border border-ink-800 text-xs font-mono text-slate-350">
                        nodemon src/server.js <span className="text-slate-500">(backend)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
