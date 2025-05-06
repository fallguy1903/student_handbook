const mongoose = require('mongoose');

const completedAssignmentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  assignments: [{
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  }]  
});

module.exports = mongoose.model('CompletedAssignment', completedAssignmentSchema);
