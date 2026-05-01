const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const adminMiddleware = require("../middleware/admin.middleware.js");

const projectController = require("../controllers/project.controller");

const createProject = projectController.createProject;
const getProjects = projectController.getProjects;

const router = express.Router();

router.use(authMiddleware);

router.post("/", adminMiddleware, createProject);
router.get("/", getProjects);

module.exports = router;