const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  filename: {type: String, required: true,},
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
