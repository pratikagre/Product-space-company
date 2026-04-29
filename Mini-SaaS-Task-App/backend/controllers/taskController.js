const { Task } = require('../models');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Task title is required" });

    const task = await Task.create({
      title,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error while creating task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting task" });
  }
};
