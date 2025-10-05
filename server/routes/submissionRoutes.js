const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware"); // optional if needed

// =====================
// POST new submission
// =====================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { hackathonId, teamName, repoLink, demoLink } = req.body;

    // Validate required fields
    if (!hackathonId || !repoLink) {
      return res.status(400).json({ error: "hackathonId and repoLink are required" });
    }

    const submission = new Submission({
      hackathonId,
      userId: req.user.id, // comes from auth middleware
      teamName: teamName || "", // optional
      repoLink,
      demoLink: demoLink || "",
      score: null,
    });

    await submission.save();
    res.status(201).json({ message: "Submission created successfully", data: submission });
  } catch (err) {
    console.error("Error creating submission:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// =====================
// GET all submissions for a hackathon
// =====================
router.get("/hackathon/:id", authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({ hackathonId: req.params.id })
      .populate("userId", "username email"); // populate user info
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// =====================
// PUT: Update scores for hackathon submissions (admin only)
// =====================
router.put("/scores/:hackathonId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const updatedScores = req.body; // expect: [{ teamId, score }, ...]

    if (!Array.isArray(updatedScores)) {
      return res.status(400).json({ error: "Invalid format: should be an array of scores" });
    }

    for (const { teamId, score } of updatedScores) {
      if (!teamId || typeof score !== "number") continue; // skip invalid
      await Submission.findByIdAndUpdate(teamId, { score });
    }

    res.json({ message: "Scores updated successfully" });
  } catch (err) {
    console.error("Error updating scores:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
