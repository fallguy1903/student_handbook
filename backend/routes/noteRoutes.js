const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/Note');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload a note
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { user, subject } = req.body;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const filename = req.file.originalname; // Get the original filename

    const newNote = new Note({
      user,
      subject,
      fileUrl,
      filename, // Store the original filename
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get notes for a subject
router.get('/:subjectId', async (req, res) => {
  try {
    const notes = await Note.find({ subject: req.params.subjectId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
