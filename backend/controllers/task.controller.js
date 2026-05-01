const prisma = require("../utils/prisma");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedToId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: "Title & projectId required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assignedToId
      }
    });

    res.status(201).json({
      message: "Task created",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: { project: true, assignedTo: true }
  });

  res.json(tasks);
};

// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { status }
    });

    res.json({
      message: "Task status updated",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTaskStatus };