import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { TaxCalculationResponse } from '../services/api';

interface TaxResultProps {
  result: TaxCalculationResponse;
}

const TaxResult: React.FC<TaxResultProps> = ({ result }) => {
  return (
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
  );
};

export default TaxResult;
