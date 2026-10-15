const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, cast: false },
    role: { type: String, required: true, cast: false },
    location: { type: String, cast: false },
    type: { type: String, default: "Full-time", cast: false },
    start_date: { type: String, required: true, cast: false },
    end_date: { type: String, cast: false },
    is_current: { type: Boolean, default: false, cast: false },
    description: { type: String, cast: false },
    skills: { type: String, cast: false },
    display_order: { type: Number, default: 0, cast: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
