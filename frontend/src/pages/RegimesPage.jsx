import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calculator, Sparkles, Languages, Landmark, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useChat } from '@/context/ChatContext';
import { regimeExplanations } from '@/utils/regimeExplanations';

export default function RegimesPage() {
  const navigate = useNavigate();
  const { setIsCalculatorOpen } = useChat();
  const [lang, setLang] = useState('en');

  const content = regimeExplanations[lang];

  const handleConsultAi = () => {
    navigate('/chat', {
      state: {
        initialMessage: `Please explain the differences between the Old and New Tax Regimes under FY 2025-26/2026-27, and explain which one might be better for my salary profile. Let's discuss in ${content.languageName}.`,
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
              {Object.keys(regimeExplanations).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setLang(langKey)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
                    lang === langKey
                      ? 'bg-accent-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
                  }`}
                >
                  {regimeExplanations[langKey].languageName}
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
            className="space-y-12"
          >
            {/* Overview Section */}
            <section className="grid gap-6 md:grid-cols-2">
              {/* Old Regime Card */}
              <Card className="border border-ink-800 bg-ink-900/35 relative overflow-hidden flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="rounded-xl bg-ink-850 p-2.5 text-slate-400">
                      <Landmark size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-white">{content.oldRegimeTitle}</h2>
                  </div>
                  <p className="text-sm leading-7 text-slate-300 mb-6">
                    {content.oldRegimeDesc}
                  </p>

                  <div className="space-y-4 text-xs">
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.standardDeductionLabel}</p>
                      <p className="text-slate-200">{content.standardDeductionOld}</p>
                    </div>
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.sec87aRebateLabel}</p>
                      <p className="text-slate-200">{content.rebateLimitOld}</p>
                    </div>
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.deductionsAllowedLabel}</p>
                      <p className="text-slate-300 leading-normal flex items-start gap-1.5">
                        <CheckCircle size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{content.deductionsOld}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* New Regime Card */}
              <Card className="border border-accent-600/20 bg-accent-950/5 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 bg-accent-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  Default Option
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3.5">
                    <div className="rounded-xl bg-accent-600/10 p-2.5 text-accent-400">
                      <Sparkles size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-white">{content.newRegimeTitle}</h2>
                  </div>
                  <p className="text-sm leading-7 text-slate-300 mb-6">
                    {content.newRegimeDesc}
                  </p>

                  <div className="space-y-4 text-xs">
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.standardDeductionLabel}</p>
                      <p className="text-slate-200">{content.standardDeductionNew}</p>
                    </div>
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.sec87aRebateLabel}</p>
                      <p className="text-slate-200">{content.rebateLimitNew}</p>
                    </div>
                    <div className="border-t border-ink-800/80 pt-3.5">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide mb-1">{content.deductionsAllowedLabel}</p>
                      <p className="text-slate-300 leading-normal flex items-start gap-1.5">
                        <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{content.deductionsNew}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Slabs Comparison Table */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {content.slabsTitle}
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-ink-800 bg-ink-900/40">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-ink-800 bg-ink-950/60 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4">Regime Slabs Comparison</th>
                      <th className="px-6 py-4">{content.slabHeaderOldRate}</th>
                      <th className="px-6 py-4">{content.slabHeaderNewRate}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-800/40 font-mono text-slate-200">
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">Up to ₹2,50,000</td>
                      <td className="px-6 py-3.5">NIL</td>
                      <td className="px-6 py-3.5" rowSpan="2">NIL (Up to ₹4,00,000)</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹2,50,001 - ₹4,00,000</td>
                      <td className="px-6 py-3.5">5%</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹4,00,001 - ₹5,00,000</td>
                      <td className="px-6 py-3.5">5%</td>
                      <td className="px-6 py-3.5">5%</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹5,00,001 - ₹8,00,000</td>
                      <td className="px-6 py-3.5" rowSpan="2">20% (₹5,00,001 - ₹10,00,000)</td>
                      <td className="px-6 py-3.5">5% (₹4,00,001 - ₹8,00,000)</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹8,00,001 - ₹10,00,000</td>
                      <td className="px-6 py-3.5">10% (₹8,00,001 - ₹12,00,000)</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹10,00,001 - ₹12,00,000</td>
                      <td className="px-6 py-3.5" rowSpan="4">30% (Above ₹10,00,000)</td>
                      <td className="px-6 py-3.5">10% (₹8,00,001 - ₹12,00,000)</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹12,00,001 - ₹16,00,000</td>
                      <td className="px-6 py-3.5">15%</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹16,00,001 - ₹20,00,000</td>
                      <td className="px-6 py-3.5">20%</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">₹20,00,001 - ₹24,00,000</td>
                      <td className="px-6 py-3.5">25%</td>
                    </tr>
                    <tr className="hover:bg-ink-900/10">
                      <td className="px-6 py-3.5 text-sans font-medium text-slate-300">Above ₹24,00,000</td>
                      <td className="px-6 py-3.5">30%</td>
                      <td className="px-6 py-3.5">30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recommendation & Call-to-actions */}
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
                <Button onClick={handleConsultAi}>
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
