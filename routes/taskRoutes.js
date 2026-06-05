const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create task in a project
router.post("/projects/:projectId/tasks", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Ownership check
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project: project._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Get tasks for a project
router.get("/projects/:projectId/tasks", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const tasks = await Task.find({
      project: project._id,
    });

    res.json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Update task
router.put("/:taskId", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error("UPDATE TASK ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete task
router.delete("/:taskId", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
