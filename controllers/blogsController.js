const Blog = require("../models/Blog");
const { cloudinary } = require("../config/cloudinary");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs); // Direct array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ is_published: true }).sort({
      createdAt: -1,
    });
    res.json(blogs); // Direct array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog); // Direct object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const body = req.body || {};

    let slug =
      body.slug ||
      body.title?.toLowerCase().replace(/\s+/g, "-") ||
      "test-blog";

    // Make slug unique if it already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    const data = {
      title: body.title || "Test Blog",
      slug,
      content: body.content || "Test content",
      excerpt: body.excerpt || "",
      is_published:
        body.is_published !== undefined
          ? body.is_published
          : body.published !== undefined
            ? body.published
            : false,
    };

    if (req.file) {
      data.cover_image_url = req.file.path;
      data.cover_image_public_id = req.file.filename;
    } else if (body.cover_image_url || body.cover_image || body.coverImage) {
      data.cover_image_url =
        body.cover_image_url || body.cover_image || body.coverImage;
    }

    const blog = await Blog.create(data);
    res.status(201).json(blog); // Direct object
  } catch (err) {
    console.error("Create blog error:", err);
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Blog with this slug already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const body = req.body || {};
    const data = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.content !== undefined) data.content = body.content;
    if (body.excerpt !== undefined) data.excerpt = body.excerpt;
    if (body.is_published !== undefined) data.is_published = body.is_published;
    else if (body.published !== undefined) data.is_published = body.published;

    if (req.file) {
      const existing = await Blog.findById(req.params.id);
      if (existing?.cover_image_public_id) {
        await cloudinary.uploader.destroy(existing.cover_image_public_id);
      }
      data.cover_image_url = req.file.path;
      data.cover_image_public_id = req.file.filename;
    } else if (body.cover_image_url || body.cover_image || body.coverImage) {
      data.cover_image_url =
        body.cover_image_url || body.cover_image || body.coverImage;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog); // Direct object
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.cover_image_public_id) {
      await cloudinary.uploader.destroy(blog.cover_image_public_id);
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// IMPORTANT: Map getPublishedBlogs to getBlogs for route compatibility
module.exports = {
  getBlogs: getPublishedBlogs,
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
