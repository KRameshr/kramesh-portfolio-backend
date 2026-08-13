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
    const body = req.body || {};

    const data = {
      institution_name:
        body.institution_name ||
        body.issuer ||
        body.institution ||
        "Test Institution",
      certificate_name:
        body.certificate_name || body.name || body.title || "Test Certificate",
      certificate_id: body.certificate_id || body.credentialId || body.id || "",
      description: body.description || "",
      skills: body.skills || "",
      start_date: body.start_date || body.issueDate || body.issue_date || "",
      end_date: body.end_date || body.expiryDate || body.expiry_date || "",
      is_expired:
        body.is_expired !== undefined
          ? body.is_expired
          : body.isExpired || false,
      credential_url:
        body.credential_url || body.credentialUrl || body.url || "",
      display_order: body.display_order || 0,
    };

    if (req.file) {
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    } else if (body.image_url || body.image || body.imageUrl) {
      data.image_url = body.image_url || body.image || body.imageUrl;
    }

    const cert = await Certification.create(data);
    res.status(201).json(cert);
  } catch (err) {
    console.error("Create certification error:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateCertification = async (req, res) => {
  try {
    const body = req.body || {};
    const data = {};

    if (body.institution_name !== undefined || body.issuer !== undefined) {
      data.institution_name = body.institution_name || body.issuer;
    }
    if (body.certificate_name !== undefined || body.name !== undefined) {
      data.certificate_name = body.certificate_name || body.name;
    }
    if (body.certificate_id !== undefined || body.credentialId !== undefined) {
      data.certificate_id = body.certificate_id || body.credentialId;
    }
    if (body.description !== undefined) data.description = body.description;
    if (body.skills !== undefined) data.skills = body.skills;
    if (body.start_date !== undefined || body.issueDate !== undefined) {
      data.start_date = body.start_date || body.issueDate;
    }
    if (body.end_date !== undefined || body.expiryDate !== undefined) {
      data.end_date = body.end_date || body.expiryDate;
    }
    if (body.is_expired !== undefined || body.isExpired !== undefined) {
      data.is_expired =
        body.is_expired !== undefined ? body.is_expired : body.isExpired;
    }
    if (body.credential_url !== undefined || body.credentialUrl !== undefined) {
      data.credential_url = body.credential_url || body.credentialUrl;
    }
    if (body.display_order !== undefined)
      data.display_order = body.display_order;

    if (req.file) {
      const existing = await Certification.findById(req.params.id);
      if (existing?.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id);
      }
      data.image_url = req.file.path;
      data.image_public_id = req.file.filename;
    } else if (body.image_url || body.image || body.imageUrl) {
      data.image_url = body.image_url || body.image || body.imageUrl;
    }

    const cert = await Certification.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
    });
    if (!cert)
      return res.status(404).json({ message: "Certification not found" });
    res.json(cert);
  } catch (err) {
    console.error("Update certification error:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert)
      return res.status(404).json({ message: "Certification not found" });

    if (cert.image_public_id) {
      await cloudinary.uploader.destroy(cert.image_public_id);
    }
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Certification deleted successfully" });
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
