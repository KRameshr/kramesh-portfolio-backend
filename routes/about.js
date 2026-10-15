const { uploadAbout } = require("../config/cloudinary");
const express = require("express");
const router = express.Router();
const {
  getAbout,
  createAbout,
  updateAbout,
} = require("../controllers/aboutController");
const protect = require("../middleware/auth");
const optionalUpload = require("../middleware/optionalUpload");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

router.get("/", getAbout);
router.post(
  "/",
  protect,
  optionalUpload(uploadAbout.single("image")),
  validate(schemas.createAbout),
  createAbout,
);
router.put(
  "/",
  protect,
  optionalUpload(uploadAbout.single("image")),
  validate(schemas.updateAbout),
  updateAbout,
);

module.exports = router;
