import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calculator, Sparkles, Languages, CheckCircle, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useChat } from '@/context/ChatContext';
import { itrExplanations } from '@/utils/itrExplanations';

export default function ItrPage() {
  const navigate = useNavigate();
  const { setIsCalculatorOpen } = useChat();
  const [lang, setLang] = useState('en');
  const [activeFormTab, setActiveFormTab] = useState('itr1');

  const content = itrExplanations[lang];
  const activeForm = content.forms.find(f => f.id === activeFormTab) || content.forms[0];

  const handleConsultAi = (formName) => {
    navigate('/chat', {
      state: {
        initialMessage: `I want to know if I should file ${formName || 'ITR'} or some other form. Please help me decide based on my income profile. Let's discuss in ${content.languageName}.`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col">
      <TopBar />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-ink-800">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {content.title}
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              {content.subtitle}
            </p>
          </div>

          {/* Language selection */}
          <div className="flex items-center gap-3 bg-ink-900/60 p-1.5 rounded-2xl border border-ink-800 self-start md:self-auto shadow-sm">
            <div className="pl-2.5 text-slate-400" title="Select Language">
              <Languages size={16} />
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.keys(itrExplanations).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setLang(langKey)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
                    lang === langKey
                      ? 'bg-accent-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
                  }`}
                >
                  {itrExplanations[langKey].languageName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content with animated transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="space-y-8"
          >
            {/* Form Selection Tabs */}
            <div className="flex flex-wrap gap-2.5 border-b border-ink-900 pb-5">
              {content.forms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => setActiveFormTab(form.id)}
                  className={`px-5 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-2 border ${
                    activeFormTab === form.id
                      ? 'bg-accent-600 border-accent-500 text-white shadow-lg shadow-accent-600/10'
                      : 'bg-ink-900/40 border-ink-800 text-slate-400 hover:text-slate-200 hover:bg-ink-800/50'
                  }`}
                >
                  <FileText size={16} />
                  {form.name}
                </button>
              ))}
            </div>

            {/* Active Form Details */}
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <Card className="border border-ink-800 bg-ink-900/35 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-600/10 text-accent-400 text-xs font-bold">
                        Indian Income Tax Department
                      </div>
                      <h2 className="text-2xl font-extrabold text-white">{activeForm.name}</h2>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-300">
                    {activeForm.description}
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-ink-800/80">
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle size={14} />
                        {content.eligibleLabel}
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {activeForm.eligible.map((item, idx) => (
                          <li key={idx} className="leading-relaxed flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-rose-450 flex items-center gap-1.5">
                        <AlertTriangle size={14} />
                        {content.notEligibleLabel}
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {activeForm.notEligible.map((item, idx) => (
                          <li key={idx} className="leading-relaxed flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Details & Disclosures sidebar */}
              <div className="space-y-6">
                <Card className="border border-ink-800 bg-ink-950/60 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle size={16} className="text-accent-400" />
                    {content.keyDetailsLabel}
                  </h3>
                  <div className="space-y-3.5">
                    {activeForm.keyDetails.map((detail, index) => (
                      <div key={index} className="flex gap-3 text-xs leading-relaxed text-slate-350 bg-ink-900/30 p-3 rounded-xl border border-ink-900">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-600/10 text-[10px] font-bold text-accent-400">
                          {index + 1}
                        </span>
                        <p className="mt-0.5">{detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Consultation Card */}
                <Card className="border border-accent-600/20 bg-accent-950/5 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase text-accent-400 tracking-wider">Fast Tax Filing Guide</p>
                    <h4 className="text-base font-bold text-white">Ask TaxGuru AI about {activeForm.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Let the AI read your income details and advise if you need to gather specific investment proofs.
                    </p>
                  </div>
                  <Button className="w-full shrink-0" onClick={() => handleConsultAi(activeForm.name)}>
                    <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                    {content.aiCTAButton}
                  </Button>
                </Card>
              </div>
            </section>

            {/* General Advice Banner */}
            <section className="rounded-3xl border border-ink-800 bg-ink-900/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {content.howToChooseTitle}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {content.howToChooseText1}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {content.howToChooseText2}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                <Button variant="secondary" onClick={() => setIsCalculatorOpen(true)}>
                  <Calculator size={16} />
                  {content.calculatorCTAButton}
                </Button>
                <Button onClick={() => handleConsultAi(activeForm.name)}>
                  <Sparkles size={16} className="text-yellow-400" />
                  {content.aiCTAButton}
                </Button>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
