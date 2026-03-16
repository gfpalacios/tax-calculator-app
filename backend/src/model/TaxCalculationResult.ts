export interface TaxCalculationResult {
    totalTax: number;
    taxPerBand: {
        band: string;
        tax: number;
    }[];
    effectiveRate: number;
}