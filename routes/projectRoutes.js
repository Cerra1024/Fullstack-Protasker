const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();


// Create project
router.post("/", protect, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      user: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all projects for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Get single project
router.get("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

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

    res.json(project);
  } catch (error) {
    console.error("GET PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Update project
router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

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

    project.name = req.body.name || project.name;
    project.description =
      req.body.description || project.description;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete project
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

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

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
