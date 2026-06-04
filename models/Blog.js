const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    cover_image_url: { type: String },
    cover_image_public_id: { type: String },
    is_published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
