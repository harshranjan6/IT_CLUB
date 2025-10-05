const express = require("express");
const { Project } = require("../models/Project"); // CommonJS style

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get single project by ID (for projectDetails page)
router.get("/:id", async (req, res) =>{
  try{
    const project = await Project.findById(req.params.id);
    if(!project){
      return res.status(404).json({message: "Project not found"});

    }
    res.json(project);
  }catch(err){
    console.error(err)
    res.status(500).json({message: "Server error"})
  }
})


module.exports = router;
