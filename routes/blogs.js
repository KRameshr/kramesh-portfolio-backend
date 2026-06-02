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

router.get("/", getBlogs);
router.get("/all", protect, getAllBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", protect, uploadBlog.single("cover_image"), createBlog);
router.put("/:id", protect, uploadBlog.single("cover_image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
