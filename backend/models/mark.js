const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subname: { type: String, required: true },
  ia: { type: Number, required: true },
  sem: { type: Number, required: true },
  grade: { type: String, required: true },
  credits: { type: Number, required: true }, // This supports floats
  semester: { type: Number, required: true }
});

const markSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  semester: { type: Number, required: true },
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Mark', markSchema);
