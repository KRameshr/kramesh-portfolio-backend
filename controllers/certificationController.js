const Certification = require("../models/Certification");
const { cloudinary } = require("../config/cloudinary");

const getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ display_order: 1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCertification = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const cert = await Certification.create(data);
    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCertification = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Certification.findById(req.params.id);
      if (existing?.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id);
      }
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    }
    const cert = await Certification.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (cert?.image_public_id) {
      await cloudinary.uploader.destroy(cert.image_public_id);
    }
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Certification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
};
