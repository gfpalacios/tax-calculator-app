import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import taxRoutes from './routes/taxRoutes';
import { errorHandler } from './middleware/errorHandler';
import {createSecurityHandler} from "./middleware/createSecurityHandler";
import rateLimit from 'express-rate-limit';


const app = express();

app.use(cors());
app.use(express.json());


// Security
app.use(createSecurityHandler());

// Rate limiting for /api/
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per window
});

app.use('/api/', limiter);



// Routes
app.use('/api/tax', taxRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

export default app;
