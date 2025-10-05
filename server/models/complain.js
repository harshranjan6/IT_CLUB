const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String }, // Keep as string for flexibility
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complains", ComplainSchema);
