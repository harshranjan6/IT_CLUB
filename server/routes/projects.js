const express = require("express");
const { Project } = require("../models/Project"); // CommonJS style

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
