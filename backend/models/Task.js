const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

  projectName: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  assignedTo: {
    type: String,
    default: 'Unassigned',
  },

  dueDate: {
    type: Date,
  },

  status: {

    type: String,

    enum: [
      'pending',
      'in progress',
      'completed',
    ],

    default: 'pending',
  },

}, {
  timestamps: true,
});

module.exports =
  mongoose.model('Task', taskSchema);