const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');

// GET all tasks
router.get('/', getTasks);

// CREATE new task
router.post('/', createTask);

// DELETE task
router.delete('/:id', deleteTask);

// UPDATE task status
router.put('/:id', updateTask);

module.exports = router;