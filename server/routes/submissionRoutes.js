const express = require("express");
const router = express.Router();

const Submission = require("../models/Submission");
const authMiddleware = require("../Middleware/authMiddleware")


// POST new submission
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { hackathonId, userId, repoLink, demoLink } = req.body;
    if(!hackathonId || !repoLink){
      return res.status(400).json({error:"hackathonId and repoLink are required"})
    }
    const submission = new Submission({ hackathonId, userId: req.user.id, repoLink, demoLink });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET all submissions for a hackathon
router.get("/hackathon/:id", async (req, res) => {
  try {
    const submissions = await Submission.find({ hackathonId: req.params.id })
      .populate("userId", "username email"); // show user info
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
