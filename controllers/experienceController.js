const Experience = require("../models/Experience");

// GET /api/experience (public)
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ display_order: 1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/experience (admin)
const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/experience/:id (admin)
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/experience/:id (admin)
const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
