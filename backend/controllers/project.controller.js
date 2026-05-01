const prisma = require("../utils/prisma");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description
      }
    });

    res.status(201).json({
      message: "Project created",
      project
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true }
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { createProject, getProjects };