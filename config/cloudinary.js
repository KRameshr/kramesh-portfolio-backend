const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  projects
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// certifications
const certStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/certifications",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// for about/profile
const aboutStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/about",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

//  for blogs
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadProject = multer({ storage: projectStorage });
const uploadCert = multer({ storage: certStorage });
const uploadAbout = multer({ storage: aboutStorage });
const uploadBlog = multer({ storage: blogStorage });

module.exports = {
  uploadProject,
  uploadCert,
  uploadAbout,
  uploadBlog,
  cloudinary,
};
