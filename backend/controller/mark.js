const Mark = require('../models/mark');

// POST /marks
exports.postMarks = async (req, res) => {
  const { userId, semester, subjects } = req.body;

  if (!userId || !semester || !subjects || !Array.isArray(subjects)) {
    return res.status(400).json({ message: "Missing or invalid data." });
  }

  try {
    // Check if marks for the user and semester already exist
    const existing = await Mark.findOne({ userId, semester });

    if (existing) {
      // Update existing record
      existing.subjects = subjects;
      await existing.save();
      return res.status(200).json({ message: "Marks updated", data: existing });
    }

    // Create new record
    const newMark = new Mark({ userId, semester, subjects });
    await newMark.save();
    res.status(201).json({ message: "Marks added", data: newMark });
  } catch (error) {
    res.status(500).json({ message: "Failed to save marks", error: error.message });
  }
};

// GET /marks/:userId - fetch all semesters
exports.getMarksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const marks = await Mark.find({ userId }).sort({ semester: 1 });
    res.json({ message: "All semester marks retrieved", marks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch marks", error: error.message });
  }
};

// GET /marks/:userId?semester=x - fetch specific semester
exports.getMarksByUserAndSemester = async (req, res) => {
  const { userId } = req.params;
  const { semester } = req.query;

  if (!semester) {
    return res.status(400).json({ message: "Semester is required" });
  }

  try {
    const marks = await Mark.findOne({ userId, semester });
    if (!marks) {
      return res.status(404).json({ message: "No marks found for this semester" });
    }
    res.json({ message: "Semester marks retrieved", subjects: marks.subjects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch marks", error: error.message });
  }
};
