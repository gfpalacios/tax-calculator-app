import request from 'supertest';
import app from '../index';

describe('Tax API', () => {
  it('should return 400 if salary or year is missing', async () => {
    const res = await request(app).get('/api/tax/calculate');
    expect(res.status).toBe(400);
  });

  it('should return 400 for unsupported year', async () => {
    const res = await request(app).get('/api/tax/calculate?salary=50000&year=2018');
    expect(res.status).toBe(400);
  });

  // Note: These tests assume the mock API is running or we mock the taxService
  // For now, testing the calculation logic directly is safer without the real API
});
