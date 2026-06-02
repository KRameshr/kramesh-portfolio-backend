const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech_stack: { type: String, required: true },
    image_url: { type: String }, // ← Cloudinary URL
    image_public_id: { type: String }, // ← for deleting old image
    live_url: { type: String },
    github_url: { type: String },
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
