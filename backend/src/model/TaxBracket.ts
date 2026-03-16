export class TaxBracket {
    constructor(
        public readonly min: number,
        public readonly rate: number,
        public readonly max?: number
    ) {
    }

    public calculateTax(salary: number): number {
        const upperLimit = this.max !== undefined ? Math.min(salary, this.max) : salary;
        const taxableAmount = Math.max(0, upperLimit - this.min);
        return taxableAmount * this.rate;
    }

    public get name(): string {
        return `${this.min}${this.max !== undefined ? ` - ${this.max}` : '+'}`;
    }
}