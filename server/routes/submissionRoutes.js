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
    const submission = new Submission({ hackathonId, userId: req.user.id, teamName,repoLink, demoLink, score: null });
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

// PUT /api/scores/:hackathonId
router.put("/scores/:hackathonId", authMiddleware, async (req, res) => {
  try {
    // Only admin can update scores
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { hackathonId } = req.params;
    const updatedScores = req.body; // [{ teamId, score }, ...]

    for (const { teamId, score } of updatedScores) {
      await Submission.findByIdAndUpdate(teamId, { score });
    }

    res.json({ message: "Scores updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
