const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  image_url: { type: String },
  image_public_id: { type: String },
  resume_url: { type: String },
  github: { type: String },
  linkedin: { type: String },
  email: { type: String },
  skills: {
    type: [String],
    default: [],
  },
  available_for_opportunities: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("About", aboutSchema);
