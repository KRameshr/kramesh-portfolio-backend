const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    institution_name: { type: String, required: true },
    certificate_name: { type: String, required: true },
    certificate_id: { type: String },
    description: { type: String },
    skills: { type: String },
    start_date: { type: String },
    end_date: { type: String },
    is_expired: { type: Boolean, default: false },
    credential_url: { type: String },
    image_url: { type: String }, // ← Cloudinary URL
    image_public_id: { type: String },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Certification", certificationSchema);
