const About = require("../models/About");
const { cloudinary } = require("../config/cloudinary");

const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAbout = async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.name || !body.title || !body.bio) {
      return res.status(400).json({
        message: "name, title and bio are required",
      });
    }

    const data = { ...body };
    if (req.file) {
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const about = await About.create(data);
    res.status(201).json(about);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.name || !body.title || !body.bio) {
      return res.status(400).json({
        message: "name, title and bio are required",
      });
    }

    const data = { ...body };
    if (req.file) {
      const existing = await About.findOne();
      if (existing?.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id);
      }
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const about = await About.findOneAndUpdate({}, data, {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    });
    res.json(about);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAbout, createAbout, updateAbout };
