const prisma = require("../utils/prisma");

const getDashboard = async (req, res) => {
  try {
    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
      where: { status: "COMPLETED" }
    });

    const pendingTasks = await prisma.task.count({
      where: { status: "TODO" }
    });

    const inProgressTasks = await prisma.task.count({
      where: { status: "IN_PROGRESS" }
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };