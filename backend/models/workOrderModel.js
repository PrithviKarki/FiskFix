import mongoose from 'mongoose';

const workOrderSchema = new mongoose.Schema(
  {
    // This creates a direct link to the User model
    // It will store the unique _id of the user who submitted the request
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This tells Mongoose which model to link to
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Submitted', 'In Progress', 'Completed'],
      default: 'Submitted',
    },
    // This will store the array of availability slots from your form
    availability: {
      type: [String], // Defines an array of strings
      default: [],
    },
    // This can be added later by an admin
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Also links to a User (who has the 'maintenance' role)
      default: null,
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

export default WorkOrder;