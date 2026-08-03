const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, cast: false },
    category: {
      type: String,
      required: true,
      enum: [
        "frontend",
        "backend",
        "database",
        "tools",
        "programming",
        "other",
      ],
      cast: false,
    },
    icon_url: { type: String, cast: false },
    proficiency: { type: Number, cast: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
