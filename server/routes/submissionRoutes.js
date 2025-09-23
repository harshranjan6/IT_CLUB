const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

// POST new submission
router.post("/", async (req, res) => {
  try {
    const { hackathonId, userId, repoLink, demoLink } = req.body;
    const submission = new Submission({ hackathonId, userId, repoLink, demoLink });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// GET all submissions for a hackathon
router.get("/hackathon/:id", async (req, res) => {
  try {
    const submissions = await Submission.find({ hackathonId: req.params.id })
      .populate("userId");
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
