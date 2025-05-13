const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  subject: { type: String, default: '' }
});

const daySchema = new mongoose.Schema({
  name: { type: String, required: true },
  periods: [periodSchema]
});

const timetableSchema = new mongoose.Schema({
  week: { type: String, default: 'default' }, // optional, for multiple weeks
  days: [daySchema]
});

module.exports = mongoose.model('Timetable', timetableSchema);
