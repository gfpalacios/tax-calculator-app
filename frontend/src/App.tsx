import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  MenuItem, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Alert,
  CircularProgress
} from '@mui/material';
import { calculateTax, TaxCalculationResponse } from './services/api';

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

      <Paper elevation={3} className="p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
          <TextField
            label="Annual Income ($)"
            variant="outlined"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Tax Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            variant="outlined"
            className="w-full md:w-48"
          >
            {[2019, 2020, 2021, 2022].map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            disabled={loading}
            className="h-14 px-8"
          >
            {loading ? <CircularProgress size={24} /> : 'Calculate'}
          </Button>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" className="mb-8">
          {error}
        </Alert>
      )}

      {result && (
        <Paper elevation={3} className="p-6">
          <Typography variant="h5" gutterBottom className="font-bold mb-4">
            Results for {result.year}
          </Typography>
          
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Box className="bg-blue-50 p-4 rounded-lg">
              <Typography variant="overline" color="textSecondary">Total Tax Owed</Typography>
              <Typography variant="h4" className="text-blue-700 font-bold">
                ${result.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box className="bg-green-50 p-4 rounded-lg">
              <Typography variant="overline" color="textSecondary">Effective Tax Rate</Typography>
              <Typography variant="h4" className="text-green-700 font-bold">
                {result.effectiveRate}%
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom className="mt-6 mb-2">
            Tax Breakdown per Band
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead className="bg-gray-50">
                <TableRow>
                  <TableCell className="font-bold">Tax Band (Range)</TableCell>
                  <TableCell align="right" className="font-bold">Tax Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.taxPerBand.map((band) => (
                  <TableRow key={band.band}>
                    <TableCell>{band.band}</TableCell>
                    <TableCell align="right">
                      ${band.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default App;
