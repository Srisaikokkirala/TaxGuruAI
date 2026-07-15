/**
 * Calculates Indian Income Tax for Old and New regimes.
 * Supports FY 2024-25, FY 2025-26, FY 2026-27.
 */
export function calculateIndianTax({
  fy = '2025-26',
  ageCategory = 'general', // 'general', 'senior', 'super_senior'
  employmentType = 'salaried', // 'salaried', 'self_employed'
  salaryIncome = 0,
  otherIncome = 0,
  deductions80C = 0,
  deductions80D = 0,
  homeLoanInterest = 0,
  hraExempt = 0,
  otherDeductions = 0,
}) {
  const grossIncome = Number(salaryIncome || 0) + Number(otherIncome || 0);
  const isSalaried = employmentType === 'salaried';

  // =========================================================================
  // 1. OLD TAX REGIME CALCULATION
  // =========================================================================
  const standardDeductionOld = isSalaried ? 50000 : 0;
  
  // Deductions limits in Old Regime
  const allowed80C = Math.min(Number(deductions80C || 0), 150000);
  
  // 80D limit depends on age category (if senior, up to 50k, else 25k)
  const limit80D = ageCategory === 'general' ? 25000 : 50050;
  const allowed80D = Math.min(Number(deductions80D || 0), limit80D);
  
  const allowedHomeLoan = Math.min(Number(homeLoanInterest || 0), 200000);
  
  const totalDeductionsOld = 
    allowed80C + 
    allowed80D + 
    allowedHomeLoan + 
    Number(hraExempt || 0) + 
    Number(otherDeductions || 0) + 
    standardDeductionOld;
    
  const taxableIncomeOld = Math.max(0, grossIncome - totalDeductionsOld);

  // Old Regime Slabs (dependent on Age Category)
  let taxOldBeforeRebate = 0;
  
  if (ageCategory === 'super_senior') {
    // 0 - 5L: Nil
    // 5L - 10L: 20%
    // Above 10L: 30%
    if (taxableIncomeOld > 1000000) {
      taxOldBeforeRebate = (taxableIncomeOld - 1000000) * 0.3 + 100000;
    } else if (taxableIncomeOld > 500000) {
      taxOldBeforeRebate = (taxableIncomeOld - 500000) * 0.2;
    }
  } else if (ageCategory === 'senior') {
    // 0 - 3L: Nil
    // 3L - 5L: 5%
    // 5L - 10L: 20%
    // Above 10L: 30%
    if (taxableIncomeOld > 1000000) {
      taxOldBeforeRebate = (taxableIncomeOld - 1000000) * 0.3 + 110000;
    } else if (taxableIncomeOld > 500000) {
      taxOldBeforeRebate = (taxableIncomeOld - 500000) * 0.2 + 10000;
    } else if (taxableIncomeOld > 300000) {
      taxOldBeforeRebate = (taxableIncomeOld - 300000) * 0.05;
    }
  } else {
    // General: Under 60 years
    // 0 - 2.5L: Nil
    // 2.5L - 5L: 5%
    // 5L - 10L: 20%
    // Above 10L: 30%
    if (taxableIncomeOld > 1000000) {
      taxOldBeforeRebate = (taxableIncomeOld - 1000000) * 0.3 + 112500;
    } else if (taxableIncomeOld > 500000) {
      taxOldBeforeRebate = (taxableIncomeOld - 500000) * 0.2 + 12500;
    } else if (taxableIncomeOld > 250000) {
      taxOldBeforeRebate = (taxableIncomeOld - 250000) * 0.05;
    }
  }

  // Rebate under 87A for Old Regime: If taxable income <= 5L, 100% rebate up to 12.5k (or 10k for senior)
  let taxOld = taxOldBeforeRebate;
  if (taxableIncomeOld <= 500000) {
    taxOld = 0;
  }

  const cessOld = taxOld * 0.04;
  const totalTaxOld = taxOld + cessOld;

  // =========================================================================
  // 2. NEW TAX REGIME CALCULATION
  // =========================================================================
  const standardDeductionNew = isSalaried ? (fy === '2024-25' ? 50000 : 75000) : 0;
  const taxableIncomeNew = Math.max(0, grossIncome - standardDeductionNew);
  
  let taxNewBeforeRebate = 0;

  if (fy === '2025-26' || fy === '2026-27') {
    // Slabs for FY 2025-26 & FY 2026-27 (revised in Budget 2025)
    // Up to 4,00,000: Nil
    // 4,00,001 to 8,00,000: 5%
    // 8,00,001 to 12,00,000: 10%
    // 12,00,001 to 16,00,000: 15%
    // 16,00,001 to 20,00,000: 20%
    // 20,00,001 to 24,00,000: 25%
    // Above 24,00,000: 30%
    const inc = taxableIncomeNew;
    if (inc > 2400000) {
      taxNewBeforeRebate = (inc - 2400000) * 0.3 + 300000;
    } else if (inc > 2000000) {
      taxNewBeforeRebate = (inc - 2000000) * 0.25 + 200000;
    } else if (inc > 1600000) {
      taxNewBeforeRebate = (inc - 1600000) * 0.2 + 120000;
    } else if (inc > 1200000) {
      taxNewBeforeRebate = (inc - 1200000) * 0.15 + 60000;
    } else if (inc > 800000) {
      taxNewBeforeRebate = (inc - 800000) * 0.1 + 20000;
    } else if (inc > 400000) {
      taxNewBeforeRebate = (inc - 400000) * 0.05;
    }
  } else {
    // Slabs for FY 2024-25 (default before Budget 2025)
    // Up to 3,00,000: Nil
    // 3,00,001 to 6,00,000: 5%
    // 6,00,001 to 9,00,000: 10%
    // 9,00,001 to 12,00,000: 15%
    // 12,00,001 to 15,00,000: 20%
    // Above 15,00,000: 30%
    const inc = taxableIncomeNew;
    if (inc > 1500000) {
      taxNewBeforeRebate = (inc - 1500000) * 0.3 + 150000;
    } else if (inc > 1200000) {
      taxNewBeforeRebate = (inc - 1200000) * 0.2 + 90000;
    } else if (inc > 900000) {
      taxNewBeforeRebate = (inc - 900000) * 0.15 + 45000;
    } else if (inc > 600000) {
      taxNewBeforeRebate = (inc - 600000) * 0.1 + 15000;
    } else if (inc > 300000) {
      taxNewBeforeRebate = (inc - 300000) * 0.05;
    }
  }

  // Rebate under 87A for New Regime
  let taxNew = taxNewBeforeRebate;
  const rebateLimit = (fy === '2025-26' || fy === '2026-27') ? 1200000 : 700000;
  
  if (taxableIncomeNew <= rebateLimit) {
    taxNew = 0;
  } else {
    // Marginal Relief: The tax payable should not exceed the income exceeding the rebate limit
    const excessIncome = taxableIncomeNew - rebateLimit;
    if (taxNewBeforeRebate > excessIncome) {
      taxNew = excessIncome;
    }
  }

  const cessNew = taxNew * 0.04;
  const totalTaxNew = taxNew + cessNew;

  // Comparison metrics
  const savings = Math.max(0, totalTaxOld - totalTaxNew);
  const isNewBetter = totalTaxNew < totalTaxOld;

  return {
    grossIncome,
    old: {
      standardDeduction: standardDeductionOld,
      deductions: totalDeductionsOld,
      taxableIncome: taxableIncomeOld,
      taxBeforeCess: taxOld,
      cess: cessOld,
      totalTax: totalTaxOld,
    },
    new: {
      standardDeduction: standardDeductionNew,
      deductions: standardDeductionNew,
      taxableIncome: taxableIncomeNew,
      taxBeforeCess: taxNew,
      cess: cessNew,
      totalTax: totalTaxNew,
    },
    savings,
    isNewBetter,
    betterRegime: isNewBetter ? 'New Regime' : totalTaxOld < totalTaxNew ? 'Old Regime' : 'Both same',
  };
}

/**
 * Format numeric value to Indian Currency format with commas (e.g. 1,50,000)
 */
export function formatINR(value) {
  if (value === undefined || value === null) return '₹0';
  const num = Math.round(Number(value));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}
