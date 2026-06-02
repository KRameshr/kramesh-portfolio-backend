const { uploadAbout } = require("../config/cloudinary");
const express = require("express");
const router = express.Router();
const {
  getAbout,
  createAbout,
  updateAbout,
} = require("../controllers/aboutController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getAbout);
router.post("/", protect, uploadAbout.single("image"), createAbout);
router.put("/", protect, uploadAbout.single("image"), updateAbout);

module.exports = router;
