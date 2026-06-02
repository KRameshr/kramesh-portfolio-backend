const Education = require("../models/Education");

// GET /api/education (public)
const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ display_order: 1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/education (admin)
const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/education/:id (admin)
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/education/:id (admin)
const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
