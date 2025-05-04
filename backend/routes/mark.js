const express = require('express');
const router = express.Router();
const marksController = require('../controller/mark');

// Save or update marks
router.post('/marks', marksController.postMarks);

// Get marks for a specific semester (use ?semester=x)
router.get('/marks/:userId', marksController.getMarksByUserAndSemester);

// Optional: Get all marks (for all semesters)
router.get('/all-marks/:userId', marksController.getMarksByUser);

module.exports = router;
