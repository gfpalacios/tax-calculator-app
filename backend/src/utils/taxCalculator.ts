export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxCalculationResult {
  totalTax: number;
  taxPerBand: {
    band: string;
    tax: number;
  }[];
  effectiveRate: number;
}

export const calculateTax = (salary: number, brackets: TaxBracket[]): TaxCalculationResult => {
  let totalTax = 0;
  const taxPerBand = [];

  for (const bracket of brackets) {
    const { min, max, rate } = bracket;
    const upperLimit = max !== undefined ? Math.min(salary, max) : salary;
    const taxableAmount = Math.max(0, upperLimit - min);

    if (taxableAmount > 0) {
      const taxForBand = taxableAmount * rate;
      totalTax += taxForBand;
      taxPerBand.push({
        band: `${min}${max !== undefined ? ` - ${max}` : '+'}`,
        tax: Number(taxForBand.toFixed(2)),
      });
    }

    if (max !== undefined && salary <= max) break;
  }

  return {
    totalTax: Number(totalTax.toFixed(2)),
    taxPerBand,
    effectiveRate: salary > 0 ? Number(((totalTax / salary) * 100).toFixed(2)) : 0,
  };
};
