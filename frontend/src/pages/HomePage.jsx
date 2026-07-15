import { ArrowRight, BadgeIndianRupee, BookOpenText, Calculator, ScrollText, ShieldAlert, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import { homeCards, suggestedQuestions } from '@/utils/content';
import { useChat } from '@/context/ChatContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { setIsCalculatorOpen } = useChat();

  return (
    <div className="min-h-screen bg-hero-grid">
      <TopBar />

      <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-7"
          >
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                AI Powered Tax Assistant
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Get intelligent guidance for Indian Income Tax using conversational AI.
                TaxGuru AI asks follow-up questions, explains concepts clearly, and feels like a
                professional tax consultant.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => navigate('/chat', { state: { initialMessage: '' } })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-10 py-3.5 text-base font-semibold text-white shadow-md shadow-accent-600/10 transition-colors hover:bg-accent-700 active:bg-accent-800 min-w-[180px]"
              >
                Start Chat
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-800 bg-ink-900/60 hover:bg-ink-850 px-7 py-3.5 text-base font-semibold text-slate-100 shadow-md transition-colors hover:text-white"
              >
                <Calculator size={18} />
                Tax Calculator
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {suggestedQuestions.slice(0, 4).map((question) => (
                <Chip key={question} onClick={() => navigate('/chat', { state: { initialMessage: question } })}>
                  {question}
                </Chip>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Smart tax workflow</p>
                  <p className="text-sm text-slate-400">Intelligent, structured, and responsive.</p>
                </div>
                <div className="rounded-xl bg-accent-600/10 p-3 text-accent-400">
                  <ShieldAlert size={20} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Calculator, label: 'Tax calculation', action: () => setIsCalculatorOpen(true), clickable: true },
                  { icon: BadgeIndianRupee, label: 'Old vs New regime', action: () => navigate('/regimes'), clickable: true },
                  { icon: ScrollText, label: 'ITR form selection', action: () => navigate('/itr'), clickable: true },
                  { icon: BookOpenText, label: 'Income Tax Act concepts', action: () => navigate('/concepts'), clickable: true },
                ].map(({ icon: Icon, label, action, clickable }) => (
                  <div
                    key={label}
                    onClick={action}
                    className={`rounded-xl border p-4 ${
                      clickable
                        ? 'border-ink-800 bg-ink-950/80 cursor-pointer hover:border-accent-500/30 hover:bg-ink-900/40 transition-all duration-150'
                        : 'border-ink-800 bg-ink-950/80'
                    }`}
                  >
                    <Icon className="mb-3 text-accent-400" size={20} />
                    <p className="text-sm font-medium text-slate-100">{label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-5">
                <p className="text-sm font-semibold text-white">Assistant behavior</p>
                <p className="mt-2 text-sm leading-7 text-slate-350">
                  If information is missing, TaxGuru AI will ask follow-up questions instead of
                  making a risky guess.
                </p>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {homeCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full space-y-3">
                <p className="text-lg font-semibold text-white">{card.title}</p>
                <p className="text-sm leading-7 text-slate-300">{card.description}</p>
              </Card>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
