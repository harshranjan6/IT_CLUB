const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  repoLink: { type: String, required: true },
  demoLink: String,
  score: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
