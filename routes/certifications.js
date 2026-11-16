const { uploadCert } = require("../config/cloudinary");
const express = require("express");
const router = express.Router();
const {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");
const protect = require("../middleware/auth");
const optionalUpload = require("../middleware/optionalUpload");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

router.get("/", getCertifications);
router.post(
  "/",
  protect,
  optionalUpload(uploadCert.single("image")),
  validate(schemas.createCertification),
  createCertification,
);
router.put(
  "/:id",
  protect,
  optionalUpload(uploadCert.single("image")),
  validate(schemas.updateCertification),
  updateCertification,
);
router.delete("/:id", protect, deleteCertification);

module.exports = router;
