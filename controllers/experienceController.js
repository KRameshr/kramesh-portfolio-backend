const Experience = require("../models/Experience");
const handleError = require("../utils/handleError");

// GET /api/experience (public)
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ display_order: 1 });
    res.json(experience);
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/experience (admin)
const createExperience = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/experience/:id (admin)
const updateExperience = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/experience/:id (admin)
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted" });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
