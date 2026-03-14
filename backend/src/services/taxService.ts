import axios from 'axios';
import logger from '../logging/logger';

const API_BASE_URL = process.env.TAX_API_URL || 'http://localhost:5001';

export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export const fetchTaxBrackets = async (year: number, retries = 3): Promise<TaxBracket[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tax-calculator/tax-year/${year}`);
    if (response.data?.tax_brackets) {
      return response.data.tax_brackets;
    }
    throw new Error('Invalid API response format');
  } catch (error: any) {
    if (retries > 0) {
      logger.warn(`Retrying fetching tax brackets for year ${year}. Retries left: ${retries - 1}`);
      return fetchTaxBrackets(year, retries - 1);
    }
    logger.error(`Failed to fetch tax brackets for year ${year} after retries: ${error.message}`);
    throw error;
  }
};
