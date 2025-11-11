// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import workOrderRoutes from './routes/workOrderRoutes.js';
// --- Setup ---
dotenv.config(); // Load variables from .env file
const app = express();
const PORT = process.env.PORT;

// --- Middleware ---

// 1. JSON Parser (Must be first for req.body)
app.use(express.json());

// 2. The Logger (Moved to the very top)
// This will log EVERY request that hits the server, even OPTIONS.
app.use((req, res, next) => {
  console.log('--- REQUEST RECEIVED ---');
  console.log(`METHOD: ${req.method}`);
  console.log(`PATH: ${req.path}`);
  console.log('------------------------');
  next(); // Pass control to the next middleware
});

// 3. Our Manual "Brute Force" CORS Fix
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // If this is the "preflight" OPTIONS request, end the request here
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Otherwise, continue to your API routes
  next();
});

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- API Routes ---
// All auth routes will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/workorders', workOrderRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});