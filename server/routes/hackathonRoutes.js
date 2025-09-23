const express = require("express");
const Hackathon = require("../models/hackathon");

const router = express.Router();

// GET all hackathons
router.get("/", async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET hackathon by id
router.get("/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
    res.json(hackathon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE hackathon
router.post("/", async (req, res) => {
  try {
    const { title, description, problemStatement, deadline } = req.body;
    const newHackathon = new Hackathon({ title, description, problemStatement, deadline });
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

module.exports = router;
