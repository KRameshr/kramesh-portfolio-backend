const Skill = require("../models/Skill");

// GET /api/skills (public)
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/skills (admin)
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/skills/:id (admin)
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/skills/:id (admin)
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
