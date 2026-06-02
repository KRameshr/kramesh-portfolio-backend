const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    type: { type: String, default: "Full-time" },
    start_date: { type: String, required: true },
    end_date: { type: String },
    is_current: { type: Boolean, default: false },
    description: { type: String },
    skills: { type: String },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
