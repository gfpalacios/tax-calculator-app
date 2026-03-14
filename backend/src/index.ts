import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import taxRoutes from './routes/taxRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tax', taxRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

export default app;
