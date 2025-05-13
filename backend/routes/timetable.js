const express = require('express');
const timetableController = require('../controller/timetable');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// Get the timetable
router.get('/timetable', isAuth, timetableController.getTimetable);

// Update the timetable
router.put('/timetable', isAuth, timetableController.updateTimetable);

module.exports = router;
