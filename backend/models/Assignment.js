const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
