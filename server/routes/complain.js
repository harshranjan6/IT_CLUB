const express = require("express");
const router = express.Router();
const Complain = require("../models/Complain");

// POST /contact
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, email, mobileNumber, subject, message, date } = req.body;

    if (!name || !email || !mobileNumber || !subject || !message) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    const newComplain = new Complain({
      name,
      rollNumber,
      email,
      mobileNumber,
      subject,
      message,
      date: date || new Date(),
    });

    const savedComplain = await newComplain.save();
    res.status(201).json({ message: "Complaint submitted successfully", data: savedComplain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
