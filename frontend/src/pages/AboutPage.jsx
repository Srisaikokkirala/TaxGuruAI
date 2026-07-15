import { CheckCircle2, Code2, Database, FileSearch, FlaskConical, Globe2, Layers3, MessageCircleHeart, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import { futureScope } from '@/utils/content';

const objectives = [
  'Create a professional conversational AI tax assistant for Indian Income Tax.',
  'Use a modular backend so the LLM can be replaced later with a RAG model.',
  'Provide clear, follow-up-driven answers instead of one-line responses.',
  'Store chat history in MongoDB for a realistic prototype workflow.',
];

const technologies = [
  { icon: Code2, label: 'React + Vite' },
  { icon: Layers3, label: 'Tailwind CSS' },
  { icon: MessageCircleHeart, label: 'Framer Motion' },
  { icon: Database, label: 'Node.js + Express + MongoDB' },
  { icon: Globe2, label: 'Axios + REST API' },
  { icon: ShieldCheck, label: 'LLM API gateway' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <Card className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-600 text-white">
                <FlaskConical size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Project Motivation</p>
                <p className="text-sm text-slate-400">Built as a college project prototype.</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              TaxGuru AI demonstrates how a modern MERN stack application can provide a professional,
              ChatGPT-like tax experience for Indian users. The current version uses only an LLM API
              and is intentionally modular so a future RAG system can replace the service layer
              without redesigning the full app.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Objectives</p>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                {objectives.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-accent-400">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Technologies</p>
                <p className="text-sm text-slate-400">Frontend, backend, and persistence stack.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {technologies.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-ink-800 bg-ink-950/40 p-4">
                  <Icon className="mb-3 text-accent-400" size={18} />
                  <p className="text-sm font-medium text-slate-100">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-white">Future Scope</p>
            <div className="flex flex-wrap gap-3">
              {futureScope.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink-800 bg-ink-900/50 px-4 py-2 text-sm text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold text-white">What makes this prototype useful</p>
            <p className="text-sm leading-7 text-slate-300">
              It demonstrates a realistic production architecture with separate frontend and backend
              services, MongoDB chat history, reusable UI components, environment-based configuration,
              and a single dedicated service for LLM calls. That design makes future replacement with
              a RAG pipeline straightforward.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
