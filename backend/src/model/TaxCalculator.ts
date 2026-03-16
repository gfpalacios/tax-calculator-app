import {TaxBracket} from "./TaxBracket";
import {TaxBracketData} from "./TaxBracketData";
import {TaxCalculationResult} from "./TaxCalculationResult";

export class TaxCalculator {
    readonly brackets: TaxBracket[];

    constructor(bracketData: TaxBracketData[]) {
        this.brackets = bracketData
            .map((b) => new TaxBracket(b.min, b.rate, b.max))
            .sort((a, b) => a.min - b.min);
    }

    public calculate(salary: number): TaxCalculationResult {
        let totalTax = 0;
        const taxPerBand = [];

        for (const bracket of this.brackets) {
            const taxForBand = bracket.calculateTax(salary);

            if (taxForBand > 0) {
                totalTax += taxForBand;
                taxPerBand.push({
                    band: bracket.name,
                    tax: Number(taxForBand.toFixed(2)),
                });
            }

            if (bracket.max !== undefined && salary <= bracket.max) break;
        }

        return {
            totalTax: Number(totalTax.toFixed(2)),
            taxPerBand,
            effectiveRate: salary > 0 ? Number(((totalTax / salary) * 100).toFixed(2)) : 0,
        };
    }
}