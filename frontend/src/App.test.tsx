import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText(/Tax Calculator/i)).toBeInTheDocument();
  });

  it('contains salary input and year select', () => {
    render(<App />);
    expect(screen.getByLabelText(/Annual Income \(\$\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax Year/i)).toBeInTheDocument();
  });

  it('contains a submit button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });
});
