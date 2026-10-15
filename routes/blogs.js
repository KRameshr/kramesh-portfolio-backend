const express = require("express");
const router = express.Router();
const { uploadBlog } = require("../config/cloudinary");
const {
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");
const protect = require("../middleware/auth");
const optionalUpload = require("../middleware/optionalUpload");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

router.get("/", getBlogs);
router.get("/all", protect, getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.post(
  "/",
  protect,
  validate(schemas.createBlog),
  optionalUpload(uploadBlog.single("cover_image")),
  createBlog,
);
router.put(
  "/:id",
  protect,
  validate(schemas.updateBlog),
  optionalUpload(uploadBlog.single("cover_image")),
  updateBlog,
);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
