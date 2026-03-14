import { calculateTax, TaxBracket } from '../utils/taxCalculator';

describe('Tax Calculator Logic', () => {
  const brackets: TaxBracket[] = [
    { min: 0, max: 50197, rate: 0.15 },
    { min: 50197, max: 100392, rate: 0.205 },
    { min: 100392, max: 155625, rate: 0.26 },
    { min: 155625, max: 221708, rate: 0.29 },
    { min: 221708, rate: 0.33 }
  ];

  it('should calculate 0 tax for 0 salary', () => {
    const result = calculateTax(0, brackets);
    expect(result.totalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it('should calculate $7,500 for $50,000 salary (2022 scenario)', () => {
    const result = calculateTax(50000, brackets);
    expect(result.totalTax).toBe(7500);
  });

  it('should calculate $17,739.17 for $100,000 salary (2022 scenario)', () => {
    const result = calculateTax(100000, brackets);
    expect(result.totalTax).toBe(17739.17);
  });
});
