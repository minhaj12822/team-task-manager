const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  createTask,
  getTasks,
  updateTaskStatus
} = require("../controllers/task.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", adminMiddleware, createTask);
router.get("/", getTasks);
router.put("/:id/status", updateTaskStatus);

module.exports = router;