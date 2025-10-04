import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);

export { Project };
