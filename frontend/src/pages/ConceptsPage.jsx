import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calculator, Sparkles, Languages, CheckCircle, HelpCircle, BookOpen, Scale, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useChat } from '@/context/ChatContext';
import { conceptExplanations } from '@/utils/conceptExplanations';

export default function ConceptsPage() {
  const navigate = useNavigate();
  const { setIsCalculatorOpen } = useChat();
  const [lang, setLang] = useState('en');
  const [activeConceptTab, setActiveConceptTab] = useState('sec80c');

  const content = conceptExplanations[lang];
  const activeConcept = content.concepts.find(c => c.id === activeConceptTab) || content.concepts[0];

  const handleConsultAi = (conceptName) => {
    navigate('/chat', {
      state: {
        initialMessage: `I want to know details about ${conceptName || 'Income Tax Act Sections'}. Can you explain how it helps save tax and what rules apply to it? Let's discuss in ${content.languageName}.`,
      },
    });
  };

  // Helper to render the maximum exemption limit representation
  const renderLimitMeter = (conceptId) => {
    let value = 0;
    let max = 200000;
    let label = "";

    if (conceptId === 'sec80c') {
      value = 150000;
      label = "₹1.5 Lakh Limit";
    } else if (conceptId === 'sec80d') {
      value = 100000;
      label = "₹1 Lakh Max Limit";
    } else if (conceptId === 'sec24') {
      value = 200000;
      label = "₹2 Lakh Limit";
    } else if (conceptId === 'sec87a') {
      value = 60000;
      max = 60000;
      label = "₹60,000 Max Rebate";
    }

    const percentage = Math.min((value / max) * 100, 100);

    return (
      <div className="space-y-2 mt-4 p-4 rounded-xl border border-ink-800 bg-ink-950/60">
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Exemption Allowance</span>
          <span className="text-accent-400">{label}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink-900 overflow-hidden relative border border-ink-800">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-accent-600 to-indigo-500 shadow-glow" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
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
              {Object.keys(conceptExplanations).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setLang(langKey)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
                    lang === langKey
                      ? 'bg-accent-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
                  }`}
                >
                  {conceptExplanations[langKey].languageName}
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
            {/* Concept Selection Tabs */}
            <div className="flex flex-wrap gap-2.5 border-b border-ink-900 pb-5">
              {content.concepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptTab(concept.id)}
                  className={`px-5 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-2 border ${
                    activeConceptTab === concept.id
                      ? 'bg-accent-600 border-accent-500 text-white shadow-lg shadow-accent-600/10'
                      : 'bg-ink-900/40 border-ink-800 text-slate-400 hover:text-slate-200 hover:bg-ink-800/50'
                  }`}
                >
                  <BookOpen size={16} />
                  {concept.name.split(' ')[0] + ' ' + concept.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Active Concept Details */}
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <Card className="border border-ink-800 bg-ink-900/35 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-600/10 text-accent-400 text-xs font-bold">
                      <Scale size={13} />
                      Income Tax Act, 1961
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">{activeConcept.name}</h2>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {content.limitLabel}
                    </p>
                    <p className="text-lg font-bold text-accent-400 font-mono">
                      {activeConcept.limit}
                    </p>
                    {renderLimitMeter(activeConcept.id)}
                  </div>

                  <div className="space-y-3 pt-5 border-t border-ink-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-accent-400" />
                      {content.eligibleInvestmentsLabel}
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-350">
                      {activeConcept.eligible.map((item, idx) => (
                        <li key={idx} className="leading-relaxed flex items-start gap-2">
                          <span className="text-accent-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Sidebar: Practical Example & Consultation */}
              <div className="space-y-6">
                <Card className="border border-ink-800 bg-ink-950/60 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Award size={16} className="text-accent-400" />
                    {content.practicalExampleLabel}
                  </h3>
                  <div className="text-xs leading-relaxed text-slate-300 bg-ink-900/30 p-4 rounded-xl border border-ink-900 relative">
                    <p className="relative z-10 italic">
                      "{activeConcept.example}"
                    </p>
                  </div>
                </Card>

                {/* Consultation Card */}
                <Card className="border border-accent-600/20 bg-accent-950/5 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase text-accent-400 tracking-wider">Legal Clarifications</p>
                    <h4 className="text-base font-bold text-white">Ask TaxGuru AI about {activeConcept.name.split(' ')[0]}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Consult AI to know if your investments match Section eligibility and avoid penalties during audit checks.
                    </p>
                  </div>
                  <Button className="w-full shrink-0" onClick={() => handleConsultAi(activeConcept.name)}>
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
                <Button onClick={() => handleConsultAi(activeConcept.name)}>
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
