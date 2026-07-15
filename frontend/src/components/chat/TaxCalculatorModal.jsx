import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Sparkles, AlertCircle, Info, Landmark, Briefcase, Calendar } from 'lucide-react';
import { calculateIndianTax, formatINR } from '@/utils/taxCalculator';
import { useChat } from '@/context/ChatContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function TaxCalculatorModal() {
  const { isCalculatorOpen, setIsCalculatorOpen, triggerCalculatorAnalysis } = useChat();

  // Form states
  const [fy, setFy] = useState('2025-26');
  const [ageCategory, setAgeCategory] = useState('general');
  const [employmentType, setEmploymentType] = useState('salaried');
  
  const [salaryIncome, setSalaryIncome] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(50000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [hraExempt, setHraExempt] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const [results, setResults] = useState(null);
  const [showDetailedSlabs, setShowDetailedSlabs] = useState(false);

  // Recalculate on any input change
  useEffect(() => {
    const res = calculateIndianTax({
      fy,
      ageCategory,
      employmentType,
      salaryIncome,
      otherIncome,
      deductions80C,
      deductions80D,
      hraExempt,
      homeLoanInterest,
      otherDeductions,
    });
    setResults(res);
  }, [
    fy,
    ageCategory,
    employmentType,
    salaryIncome,
    otherIncome,
    deductions80C,
    deductions80D,
    hraExempt,
    homeLoanInterest,
    otherDeductions,
  ]);

  if (!isCalculatorOpen) return null;

  const handleAiConsult = () => {
    const summary = {
      fy,
      ageCategory: ageCategory === 'general' ? 'Under 60' : ageCategory === 'senior' ? 'Senior (60-80)' : 'Super Senior (80+)',
      employmentType: employmentType === 'salaried' ? 'Salaried' : 'Self-Employed / Business',
      salaryIncome,
      otherIncome,
      deductions80C,
      deductions80D,
      hraExempt,
      homeLoanInterest,
      otherDeductions,
      oldTax: results?.old.totalTax,
      newTax: results?.new.totalTax,
      betterRegime: results?.betterRegime,
      savings: results?.savings,
    };

    triggerCalculatorAnalysis(summary);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl rounded-3xl border border-ink-800 bg-ink-950 p-6 shadow-glow md:p-8"
        >
          {/* Top Bar Accent Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-600 via-indigo-500 to-purple-600 rounded-t-3xl" />

          {/* Close button */}
          <button
            onClick={() => setIsCalculatorOpen(false)}
            className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-slate-400 hover:bg-ink-800 hover:text-white transition-colors"
            aria-label="Close calculator"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <div className="flex items-center gap-3.5 mb-6 md:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600 text-white">
              <Calculator size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Assisted Tax Calculator</h2>
              <p className="text-sm text-slate-450">Input details for instant estimates, then consult TaxGuru AI.</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* INPUT SECTION */}
            <div className="space-y-5 lg:col-span-7 pr-0 lg:pr-3 overflow-y-auto max-h-[60vh] scrollbar-thin">
              {/* Dropdowns row */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* FY Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar size={13} className="text-accent-400" /> Financial Year
                  </label>
                  <select
                    value={fy}
                    onChange={(e) => setFy(e.target.value)}
                    className="w-full rounded-xl border border-ink-800 bg-ink-900/60 px-3 py-2.5 text-sm text-slate-200 focus:border-accent-500/50 outline-none"
                  >
                    <option value="2026-27">FY 2026-27 (AY 27-28)</option>
                    <option value="2025-26">FY 2025-26 (AY 26-27)</option>
                    <option value="2024-25">FY 2024-25 (AY 25-26)</option>
                  </select>
                </div>

                {/* Employment Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Briefcase size={13} className="text-accent-400" /> Employed Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full rounded-xl border border-ink-800 bg-ink-900/60 px-3 py-2.5 text-sm text-slate-200 focus:border-accent-500/50 outline-none"
                  >
                    <option value="salaried">Salaried Employee</option>
                    <option value="self_employed">Business / Self-Employed</option>
                  </select>
                </div>

                {/* Age Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Landmark size={13} className="text-accent-400" /> Age Group
                  </label>
                  <select
                    value={ageCategory}
                    onChange={(e) => setAgeCategory(e.target.value)}
                    className="w-full rounded-xl border border-ink-800 bg-ink-900/60 px-3 py-2.5 text-sm text-slate-200 focus:border-accent-500/50 outline-none"
                  >
                    <option value="general">Under 60 years</option>
                    <option value="senior">Senior (60-80 years)</option>
                    <option value="super_senior">Super Senior (80+ years)</option>
                  </select>
                </div>
              </div>

              {/* Income Fields */}
              <div className="space-y-3.5 border-t border-ink-800 pt-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Incomes</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">Gross Salary Income (Annual)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={salaryIncome}
                        onChange={(e) => setSalaryIncome(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">Other / Business / Interest Income</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions fields (Chapter VI-A) */}
              <div className="space-y-3.5 border-t border-ink-800 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deductions (Old Regime)</h3>
                  <span className="text-[10px] bg-accent-950 text-accent-400 px-2 py-0.5 rounded font-mono">Applicable for Old regime</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Section 80C (PPF, ELSS, EPF...)</span>
                      <span className="text-slate-500">Max ₹1.5L</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={deductions80C}
                        onChange={(e) => setDeductions80C(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Section 80D (Health Insurance)</span>
                      <span className="text-slate-500">Max ₹25k / ₹50k</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={deductions80D}
                        onChange={(e) => setDeductions80D(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">House Rent Allowance (HRA) Exempt</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={hraExempt}
                        onChange={(e) => setHraExempt(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Sec 24(b) Home Loan Interest</span>
                      <span className="text-slate-500">Max ₹2L</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                      <input
                        type="number"
                        value={homeLoanInterest}
                        onChange={(e) => setHomeLoanInterest(Math.max(0, Number(e.target.value)))}
                        className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Other Deductions (e.g. 80CCD(1B), 80TTA/B, 80G)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(Math.max(0, Number(e.target.value)))}
                      className="w-full rounded-xl border border-ink-800 bg-ink-900/60 pl-8 pr-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS SECTION */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-ink-800 lg:pl-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Comparison Estimate</h3>

                {/* Slabs Side by Side */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {/* Old Regime Card */}
                  <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-4 relative overflow-hidden">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Old Tax Regime</p>
                    <p className="mt-2 text-2xl font-bold text-white">{results ? formatINR(results.old.totalTax) : '₹0'}</p>
                    <div className="mt-2 text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Taxable:</span>
                        <span>{results ? formatINR(results.old.taxableIncome) : '₹0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deductions:</span>
                        <span>{results ? formatINR(results.old.deductions) : '₹0'}</span>
                      </div>
                    </div>
                  </div>

                  {/* New Regime Card */}
                  <div className={`rounded-2xl border p-4 relative overflow-hidden ${results?.isNewBetter ? 'border-accent-500/30 bg-accent-950/15' : 'border-ink-800 bg-ink-900/40'}`}>
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold text-slate-400 uppercase">New Tax Regime</p>
                      {results?.isNewBetter && (
                        <span className="text-[10px] bg-accent-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Recommended</span>
                      )}
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">{results ? formatINR(results.new.totalTax) : '₹0'}</p>
                    <div className="mt-2 text-xs text-slate-400 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Taxable:</span>
                        <span>{results ? formatINR(results.new.taxableIncome) : '₹0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deductions:</span>
                        <span>{results ? formatINR(results.new.deductions) : '₹0'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Banner */}
                {results && results.savings > 0 && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3.5 flex items-start gap-2.5">
                    <Sparkles className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">
                        Save {formatINR(results.savings)} in New Regime
                      </p>
                      <p className="text-xs text-emerald-455 mt-0.5 leading-normal">
                        Switching to the {results.betterRegime} is financially beneficial.
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Slabs Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowDetailedSlabs(!showDetailedSlabs)}
                    className="text-xs text-accent-400 hover:text-accent-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Info size={13} /> {showDetailedSlabs ? 'Hide Tax Slab Details' : 'Show Tax Slab Details'}
                  </button>

                  <AnimatePresence>
                    {showDetailedSlabs && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-xs space-y-2 border border-ink-800 bg-ink-950/80 p-3 rounded-xl overflow-hidden font-mono leading-relaxed"
                      >
                        <p className="font-bold text-white uppercase text-[10px] tracking-wide border-b border-ink-800 pb-1">
                          New Regime Slabs ({fy === '2024-25' ? 'FY 24-25' : 'FY 25-26 & 26-27'}):
                        </p>
                        {fy === '2024-25' ? (
                          <ul className="list-disc pl-3 text-slate-400 space-y-0.5">
                            <li>0 - 3L: Nil</li>
                            <li>3L - 6L: 5%</li>
                            <li>6L - 9L: 10%</li>
                            <li>9L - 12L: 15%</li>
                            <li>12L - 15L: 20%</li>
                            <li>Above 15L: 30%</li>
                            <li>Rebate u/s 87A up to ₹7,00,000 net income.</li>
                          </ul>
                        ) : (
                          <ul className="list-disc pl-3 text-slate-400 space-y-0.5">
                            <li>0 - 4L: Nil</li>
                            <li>4L - 8L: 5%</li>
                            <li>8L - 12L: 10%</li>
                            <li>12L - 16L: 15%</li>
                            <li>16L - 20L: 20%</li>
                            <li>20L - 24L: 25%</li>
                            <li>Above 24L: 30%</li>
                            <li>Rebate u/s 87A up to ₹12,00,000 net income.</li>
                          </ul>
                        )}
                        <p className="text-[10px] text-slate-450 border-t border-ink-800 pt-1 mt-1 font-sans">
                          *Salaried standard deduction of {fy === '2024-25' ? '₹50,000' : '₹75,000'} applies.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CONSULT AI BUTTON */}
              <div className="pt-4 border-t border-ink-800">
                <button
                  onClick={handleAiConsult}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 to-indigo-600 hover:from-accent-700 hover:to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg transition-all"
                >
                  <Sparkles size={16} className="animate-pulse" />
                  Analyze & Verify with AI
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-2.5">
                  TaxGuru AI will verify slabs, evaluate deductions, explain rebates, and offer optimization tips.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
