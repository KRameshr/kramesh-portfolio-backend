const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinary");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects); // Direct array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const body = req.body || {};

    const data = {
      title: body.title || "Test Project",
      description: body.description || "Test description",
      tech_stack:
        body.tech_stack ||
        (Array.isArray(body.technologies)
          ? body.technologies.join(", ")
          : body.technologies) ||
        "Node.js",
    };

    if (req.file) {
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    } else if (body.image_url || body.image || body.imageUrl) {
      data.image_url = body.image_url || body.image || body.imageUrl;
    }

    if (body.live_url || body.liveUrl || body.liveUrl)
      data.live_url = body.live_url || body.liveUrl;
    if (body.github_url || body.githubUrl || body.github)
      data.github_url = body.github_url || body.githubUrl || body.github;
    if (body.is_featured !== undefined) data.is_featured = body.is_featured;
    else if (body.featured !== undefined) data.is_featured = body.featured;

    const project = await Project.create(data);
    res.status(201).json(project); // Direct object
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const body = req.body || {};
    const data = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.description !== undefined) data.description = body.description;
    if (body.tech_stack !== undefined) data.tech_stack = body.tech_stack;
    else if (body.technologies !== undefined) {
      data.tech_stack = Array.isArray(body.technologies)
        ? body.technologies.join(", ")
        : body.technologies;
    }
    if (body.live_url !== undefined || body.liveUrl !== undefined)
      data.live_url = body.live_url || body.liveUrl;
    if (
      body.github_url !== undefined ||
      body.githubUrl !== undefined ||
      body.github !== undefined
    ) {
      data.github_url = body.github_url || body.githubUrl || body.github;
    }
    if (body.is_featured !== undefined) data.is_featured = body.is_featured;
    else if (body.featured !== undefined) data.is_featured = body.featured;

    if (req.file) {
      const existing = await Project.findById(req.params.id);
      if (existing?.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id);
      }
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    } else if (body.image_url || body.image || body.imageUrl) {
      data.image_url = body.image_url || body.image || body.imageUrl;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project); // Direct object
  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.image_public_id) {
      await cloudinary.uploader.destroy(project.image_public_id);
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
