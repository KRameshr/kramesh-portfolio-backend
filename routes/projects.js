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

const upload = require("../middleware/upload");

router.get("/", getProjects);
router.post("/", protect, uploadProject.single("image"), createProject);
router.put("/:id", protect, uploadProject.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
