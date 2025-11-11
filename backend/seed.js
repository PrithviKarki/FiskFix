// backend/seed.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/userModel.js'; // Import your User model

// Load environment variables from .env
dotenv.config();

// --- START: The user we want to create ---
const email = 'student@fisk.edu';
const password = 'password123';
const role = 'student';
// --- END: The user we want to create ---

const seedUser = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Seed script connected to MongoDB...');

    // 2. Remove any existing user with this email
    await User.deleteMany({ email: email });
    console.log('Removed any old user with this email.');

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed.');

    // 4. Create the new user
    await User.create({
      email: email,
      password: hashedPassword,
      role: role,
    });

    console.log('SUCCESS! User created successfully:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
  } catch (error) {
    console.error('Error seeding user:', error.message);
  } finally {
    // 5. Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

// Run the function
seedUser();