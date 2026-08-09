const Education = require("../models/Education");
const handleError = require("../utils/handleError");

// GET /api/education (public)
const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ display_order: 1 });
    res.json(education);
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/education (admin)
const createEducation = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/education/:id (admin)
const updateEducation = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json(education);
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/education/:id (admin)
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json({ message: "Education deleted" });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
