const Task = require('../models/Task');


// GET TASKS
exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });

  }

};


// CREATE TASK
exports.createTask = async (req, res) => {

  try {

    const {
      projectName,
      title,
      description,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({

      projectName,
      title,
      description,
      assignedTo,
      dueDate,

    });

    res.status(201).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });

  }

};


// DELETE TASK
exports.deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: 'Task deleted',
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });

  }

};


// UPDATE TASK
exports.updateTask = async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.status(200).json(updatedTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error',
    });

  }

};