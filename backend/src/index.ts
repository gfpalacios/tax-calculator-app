import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import taxRoutes from './routes/taxRoutes';
import { errorHandler } from './middleware/errorHandler';
import logger from './logging/logger';

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
