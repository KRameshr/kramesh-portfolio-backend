const { uploadProject } = require("../config/cloudinary");
const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");
const optionalUpload = require("../middleware/optionalUpload");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

router.get("/", getProjects);

router.post(
  "/",
  protect,
  optionalUpload(uploadProject.single("image")),
  validate(schemas.createProject),
  createProject,
);

router.put(
  "/:id",
  protect,
  optionalUpload(uploadProject.single("image")), // 1. ఇమేజ్ & టెక్స్ట్ డేటా పార్స్ అవుతుంది
  validate(schemas.updateProject), // 2. req.body ని వాలిడేట్ చేస్తుంది
  updateProject,
);
router.delete("/:id", protect, deleteProject);

module.exports = router;
