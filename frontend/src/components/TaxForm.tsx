import React from 'react';
import { 
  Paper, 
  TextField, 
  MenuItem, 
  Button, 
  CircularProgress 
} from '@mui/material';

interface TaxFormProps {
  salary: string;
  year: number;
  loading: boolean;
  onSalaryChange: (value: string) => void;
  onYearChange: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TaxForm: React.FC<TaxFormProps> = ({
  salary,
  year,
  loading,
  onSalaryChange,
  onYearChange,
  onSubmit
}) => {
  return (
    <Paper elevation={3} className="p-6 mb-8">
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 items-start">
        <TextField
          label="Annual Income ($)"
          variant="outlined"
          type="number"
          value={salary}
          onChange={(e) => onSalaryChange(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Tax Year"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
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
  );
};

export default TaxForm;
