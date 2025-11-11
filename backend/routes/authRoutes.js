// backend/routes/authRoutes.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Import your User model

const router = express.Router();

// --- Helper Function to Generate JWT ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// --- Endpoint 1: POST /api/auth/register ---
// (Creates a new user, hashes their password)
router.post('/register', async (req, res) => {
  // Log that the request was received
  console.log('--- /api/auth/register endpoint HIT ---');
  console.log('Request Body:', req.body); // Also log the data

  try {
    const { email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user in the database
    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || 'student', // Default to 'student' if no role is provided
    });

    // 4. Send back a response (with a token)
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('REGISTER ERROR:', error); // Log the full error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// --- Endpoint 2: POST /api/auth/login ---
// (Checks credentials, returns a user object and a token)
router.post('/login', async (req, res) => {
  console.log('--- /api/auth/login endpoint HIT ---');
  console.log('Request Body:', req.body);
  
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. If user exists AND password matches, send back user data + token
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // 4. If user doesn't exist or password doesn't match, send error
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;