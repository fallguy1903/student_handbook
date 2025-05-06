// routes/assignmentRoutes.js
const express = require('express');
const Assignment = require('../models/Assignment'); // Ensure you have the correct model
const CompletedAssignment = require('../models/CompletedAssignment');  // Adjust the path as needed

const router = express.Router();

// Route to get assignments for a specific subject
router.get('/:subjectId', async (req, res) => {
  try {
    const assignments = await Assignment.find({ subjectId: req.params.subjectId });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
});

router.get('/completed-assignments/:user', async (req, res) => {
  const { user } = req.params;
  try {
    const completed = await CompletedAssignment.findOne({ user });
    res.status(200).json(completed || { user, assignments: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching completed assignments' });
  }
});


// Route to create a new assignment
router.post('/', async (req, res) => {
  const { subjectId, title, description, dueDate } = req.body;

  if (!subjectId || !title || !description) {
    return res.status(400).json({ message: 'Subject, title, and description are required' });
  }

  try {
    const newAssignment = new Assignment({ subjectId, title, description, dueDate });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating assignment' });
  }
});

// body: { user: 'username', assignmentId: '...' }
router.post('/completed-assignments', async (req, res) => {
  const { user, assignmentId } = req.body;
  try {
    let completed = await CompletedAssignment.findOne({ user });
    if (!completed) {
      completed = new CompletedAssignment({ user, assignments: [{ assignmentId }] });
    } else {
      const alreadyDone = completed.assignments.some(a => a.assignmentId.equals(assignmentId));
      if (!alreadyDone) completed.assignments.push({ assignmentId });
    }
    await completed.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error saving completed assignment' });
  }
});


module.exports = router;
