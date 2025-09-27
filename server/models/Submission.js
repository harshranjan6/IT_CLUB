const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true},

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

  teamName:{ type: String},
  repoLink: { type: String, required: true },
  demoLink: {type: String},
  score: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
