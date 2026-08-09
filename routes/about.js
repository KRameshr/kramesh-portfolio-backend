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
  validate(schemas.createAbout),
  optionalUpload(uploadAbout.single("image")),
  createAbout,
);
router.put(
  "/",
  protect,
  validate(schemas.updateAbout),
  optionalUpload(uploadAbout.single("image")),
  updateAbout,
);

module.exports = router;
