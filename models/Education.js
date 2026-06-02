const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    location: { type: String },
    degree: { type: String, required: true },
    branch: { type: String },
    start_date: { type: String, required: true },
    end_date: { type: String },
    progress: { type: String, default: "Completed" },
    is_current: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
