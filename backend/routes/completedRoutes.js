const express = require('express');
const router = express.Router();
const CompletedAssignment = require('../models/CompletedAssignment');

// Mark an assignment as completed
router.post('/', async (req, res) => {
  try {
    const { user, assignmentId } = req.body;

    // Find if the user already has a record
    let record = await CompletedAssignment.findOne({ user });

    if (!record) {
      // Create a new record for the user
      record = new CompletedAssignment({
        user,
        assignments: [{ assignmentId }],
      });
    } else {
      // Check for duplicates before pushing
      const alreadyExists = record.assignments.some(a => a.assignmentId.toString() === assignmentId);
      if (!alreadyExists) {
        record.assignments.push({ assignmentId });
      }
    }

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET completed assignments for a user
router.get('/user/:username', async (req, res) => {
  try {
    const completed = await CompletedAssignment.findOne({ user: req.params.username })
      .populate('assignments.assignmentId'); // Populates assignment details

    if (!completed) {
      return res.status(404).json({ message: 'No completed assignments found for this user.' });
    }

    res.json(completed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
