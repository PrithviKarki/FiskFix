import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
      lowercase: true, // Store emails as lowercase
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['student', 'ra', 'rd', 'maintenance'], // Restrict roles
      default: 'student', // Default role for new users
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;