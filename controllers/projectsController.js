const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinary");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      // Delete old image from Cloudinary
      const existing = await Project.findById(req.params.id);
      if (existing?.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id);
      }
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project?.image_public_id) {
      await cloudinary.uploader.destroy(project.image_public_id);
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
