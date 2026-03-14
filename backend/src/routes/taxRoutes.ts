import { Router } from 'express';
import { fetchTaxBrackets } from '../services/taxService';
import { calculateTax } from '../utils/taxCalculator';
import logger from '../logging/logger';

const router = Router();

router.get('/calculate', async (req, res, next) => {
  try {
    const { salary, year } = req.query;

    if (!salary || !year) {
      return res.status(400).json({ error: 'Salary and year are required' });
    }

    const salaryNum = Number.parseFloat(salary as string);
    const yearNum = Number.parseInt(year as string);

    if (Number.isNaN(salaryNum) || salaryNum < 0) {
      return res.status(400).json({ error: 'Invalid salary' });
    }

    const supportedYears = [2019, 2020, 2021, 2022];
    if (!supportedYears.includes(yearNum)) {
      return res.status(400).json({ error: `Year ${yearNum} is not supported. Supported years: ${supportedYears.join(', ')}` });
    }

    logger.info(`Calculating tax for salary: ${salaryNum}, year: ${yearNum}`);

    const brackets = await fetchTaxBrackets(yearNum);
    const result = calculateTax(salaryNum, brackets);

    res.json({
      salary: salaryNum,
      year: yearNum,
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
