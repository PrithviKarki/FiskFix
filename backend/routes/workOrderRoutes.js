// File: backend/routes/workOrderRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Import our "gatekeeper"
import WorkOrder from '../models/workOrderModel.js'; // Import the WorkOrder model

const router = express.Router();

// --- Endpoint 1: POST /api/workorders ---
// (Creates a new work order)
// We add "protect" as the second argument. This route is now protected.
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, building, room, availability } = req.body;

    // We can use req.user because the "protect" middleware gave it to us
    const workOrder = await WorkOrder.create({
      submittedBy: req.user._id, // Link to the logged-in user
      title,
      description,
      building,
      room,
      availability,
    });

    res.status(201).json(workOrder);
  } catch (error) {
    console.error('Work order creation error:', error);
    res.status(400).json({ message: 'Error creating work order' });
  }
});

// --- Endpoint 2: GET /api/workorders/mine ---
// (Gets all requests for the currently logged-in student)
// This route is also protected.
router.get('/mine', protect, async (req, res) => {
  try {
    // Find all work orders where submittedBy matches the logged-in user's ID
    const workOrders = await WorkOrder.find({ submittedBy: req.user._id });
    res.json(workOrders);
  } catch (error) {
    console.error('Get my work orders error:', error);
    res.status(500).json({ message: 'Error fetching work orders' });
  }
});

export default router;