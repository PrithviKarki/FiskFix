// File: backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// --- PROTECT FUNCTION (FIRST) ---
const protect = async (req, res, next) => {
  let token;

  // 1. Check if the request has a token in the 'Authorization' header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Get the token from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token is real using your JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user from the token's ID and attach them to the request
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Continue to the next step (the actual route)
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// --- ADMIN FUNCTION (SECOND) ---
// This function must be SEPARATE from and AFTER the 'protect' function.
// Do NOT paste this inside the 'protect' function's { ... }
const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'rd' || req.user.role === 'maintenance')) {
    // If user is 'rd' OR 'maintenance', they are an admin.
    next(); // Continue to the route
  } else {
    // If they are 'student' or 'ra', block them
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// --- EXPORT (LAST) ---
// This export line is at the very bottom of the file
// and can now see both 'protect' and 'admin'
export { protect, admin };