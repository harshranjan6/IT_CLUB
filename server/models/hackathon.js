const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  problemStatement: String,
  deadline: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true , collection: "hackathon_db"});

module.exports = mongoose.model("Hackathon", hackathonSchema);
