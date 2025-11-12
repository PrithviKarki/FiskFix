// File: backend/routes/workOrderRoutes.js

import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
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

// --- Endpoint 3: GET /api/workorders/all ---
// (Gets all work orders from all students)
// This is protected AND admin-only
router.get('/all', protect, admin, async (req, res) => {
  try {
    // find({}) gets ALL work orders.
    // .populate() also fetches the email of the user who submitted it.
    const workOrders = await WorkOrder.find({}).populate(
      'submittedBy',
      'email'
    );
    res.json(workOrders);
  } catch (error) {
    console.error('Get all work orders error:', error);
    res.status(500).json({ message: 'Error fetching all work orders' });
  }
});

// --- Endpoint 4: PUT /api/workorders/:id ---
// (Updates a work order, e.g., to change status)
// This is also protected AND admin-only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    // Get the new status from the request body
    const { status } = req.body;

    // Find the work order by its ID (from the URL parameter)
    const workOrder = await WorkOrder.findById(req.params.id);

    if (workOrder) {
      // Update its status
      workOrder.status = status || workOrder.status;

      // (Optional) You could also assign it to the admin here
      // workOrder.assignedTo = req.user._id;

      // Save the updated work order back to the database
      const updatedWorkOrder = await workOrder.save();
      res.json(updatedWorkOrder);
    } else {
      res.status(404).json({ message: 'Work order not found' });
    }
  } catch (error) {
    console.error('Update work order error:', error);
    res.status(500).json({ message: 'Error updating work order' });
  }
});
// ------------------------------------

export default router;