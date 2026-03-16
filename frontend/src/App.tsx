import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert
} from '@mui/material';
import { calculateTax, TaxCalculationResponse } from './services/api';
import TaxForm from './components/TaxForm';
import TaxResult from './components/TaxResult';

const App: React.FC = () => {
  const [salary, setSalary] = useState<string>('');
  const [year, setYear] = useState<number>(2022);
  const [result, setResult] = useState<TaxCalculationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const salaryNum = Number.parseFloat(salary);
    if (Number.isNaN(salaryNum) || salaryNum < 0) {
      setError('Please enter a valid salary');
      setLoading(false);
      return;
    }

    try {
      const data = await calculateTax(salaryNum, year);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'An error occurred while calculating tax');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" gutterBottom className="font-bold text-blue-600">
          Tax Calculator
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Calculate your total income tax for a given salary and tax year.
        </Typography>
      </Box>

      <TaxForm 
        salary={salary}
        year={year}
        loading={loading}
        onSalaryChange={setSalary}
        onYearChange={setYear}
        onSubmit={handleSubmit}
      />

      {error && (
        <Alert severity="error" className="mb-8">
          {error}
        </Alert>
      )}

      {result && <TaxResult result={result} />}
    </Container>
  );
};

export default App;
