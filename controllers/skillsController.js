const Skill = require("../models/Skill");
const handleError = require("../utils/handleError");

// GET /api/skills (public)
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/skills (admin)
const createSkill = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/skills/:id (admin)
const updateSkill = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
    if (Object.values(req.body).some((v) => v === null)) {
      return res.status(400).json({ message: "Fields cannot be null" });
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/skills/:id (admin)
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
