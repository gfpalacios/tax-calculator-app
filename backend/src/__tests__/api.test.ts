import request from 'supertest';
import app from '../app';
import * as taxService from '../services/taxService';

jest.mock('../services/taxService');

describe('Tax API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if salary or year is missing', async () => {
    const res = await request(app).get('/api/tax/calculate');
    expect(res.status).toBe(400);
  });

  it('should return 400 for unsupported year', async () => {
    const res = await request(app).get('/api/tax/calculate?salary=50000&year=2018');
    expect(res.status).toBe(400);
  });

  it('should calculate tax correctly for a valid year', async () => {
    const mockBrackets = [
      { min: 0, max: 50000, rate: 0.15 },
      { min: 50000, rate: 0.20 }
    ];
    
    (taxService.fetchTaxBrackets as jest.Mock).mockResolvedValue(mockBrackets);

    const res = await request(app).get('/api/tax/calculate?salary=60000&year=2019');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      salary: 60000,
      year: 2019,
      totalTax: 9500, // (50000 * 0.15) + (10000 * 0.20) = 7500 + 2000 = 9500
    });
    expect(taxService.fetchTaxBrackets).toHaveBeenCalledWith(2019);
  });

  it('should return 500 if tax service fails', async () => {
    (taxService.fetchTaxBrackets as jest.Mock).mockRejectedValue(new Error('API Error'));

    const res = await request(app).get('/api/tax/calculate?salary=50000&year=2019');
    expect(res.status).toBe(500);
  });
});

