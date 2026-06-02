const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["frontend", "backend", "database", "tools", "programming", "other"],
    required: true,
  },
  icon_url: { type: String },
  proficiency: { type: Number, default: 80 },
});

module.exports = mongoose.model("Skill", skillSchema);
