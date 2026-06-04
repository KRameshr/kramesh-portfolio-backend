const Blog = require("../models/Blog");
const { cloudinary } = require("../config/cloudinary");

// Get public blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ is_published: true }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all blogs (admin)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get blog by slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create blog
const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.cover_image_url = req.file.path;
      data.cover_image_public_id = req.file.filename;
    }
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Blog.findById(req.params.id);
      if (existing?.cover_image_public_id) {
        await cloudinary.uploader.destroy(existing.cover_image_public_id);
      }
      data.cover_image_url = req.file.path;
      data.cover_image_public_id = req.file.filename;
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.cover_image_public_id) {
      await cloudinary.uploader.destroy(blog.cover_image_public_id);
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
