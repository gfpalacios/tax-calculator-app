import axios from 'axios';

export interface TaxCalculationResponse {
  salary: number;
  year: number;
  totalTax: number;
  taxPerBand: {
    band: string;
    tax: number;
  }[];
  effectiveRate: number;
}

export const calculateTax = async (salary: number, year: number): Promise<TaxCalculationResponse> => {
  const response = await axios.get(`/api/tax/calculate`, {
    params: { salary, year }
  });
  return response.data;
};
