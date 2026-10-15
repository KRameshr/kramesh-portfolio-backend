const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, cast: false },
    location: { type: String, cast: false },
    degree: { type: String, required: true, cast: false },
    branch: { type: String, cast: false },
    start_date: { type: String, required: true, cast: false },
    end_date: { type: String, cast: false },
    progress: { type: String, default: "Completed", cast: false },
    is_current: { type: Boolean, default: false, cast: false },
    display_order: { type: Number, default: 0, cast: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
