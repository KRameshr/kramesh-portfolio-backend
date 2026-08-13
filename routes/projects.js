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
  optionalUpload(uploadProject.single("image")),
  validate(schemas.updateProject),
  updateProject,
);
router.delete("/:id", protect, deleteProject);

module.exports = router;
