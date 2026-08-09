// seed/specmaticTestData.js
require("dotenv").config();
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");

const Education = require("../models/Education");
const Experience = require("../models/Experience");
const Skill = require("../models/Skill");
const About = require("../models/About");
const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Certification = require("../models/Certification");
const Contact = require("../models/Contact");
const Admin = require("../models/Admin");

// ========== UPDATE IDs (for PUT tests) ==========
const EDUCATION_ID = "64f1a2b3c4d5e6f7a8b9c0d1";
const EXPERIENCE_ID = "64f1a2b3c4d5e6f7a8b9c0d2";
const SKILL_ID = "64f1a2b3c4d5e6f7a8b9c0d3";
const ABOUT_ID = "64f1a2b3c4d5e6f7a8b9c0d8";
const PROJECT_ID = "64f1a2b3c4d5e6f7a8b9c0d4";
const BLOG_ID = "64f1a2b3c4d5e6f7a8b9c0d5";
const CERTIFICATION_ID = "64f1a2b3c4d5e6f7a8b9c0d7";
const CONTACT_ID = "64f1a2b3c4d5e6f7a8b9c0d6";

// ========== DELETE IDs (DIFFERENT from update IDs) ==========
const EDUCATION_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e1";
const EXPERIENCE_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e2";
const SKILL_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e3";
const PROJECT_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0d9";
const BLOG_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0da";
const CERTIFICATION_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0db";
const CONTACT_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0dc";

const ADMIN_ID = "64f1a2b3c4d5e6f7a8b9c0ff";

const seed = async () => {
  await connectDB();

  // Clear old test data
  await Promise.all([
    About.deleteMany({}),
    Project.deleteMany({}),
    Blog.deleteMany({}),
    Certification.deleteMany({}),
    Contact.deleteMany({}),
    Education.deleteMany({ _id: { $in: [EDUCATION_ID, EDUCATION_DELETE_ID] } }),
    Experience.deleteMany({
      _id: { $in: [EXPERIENCE_ID, EXPERIENCE_DELETE_ID] },
    }),
    Skill.deleteMany({ _id: { $in: [SKILL_ID, SKILL_DELETE_ID] } }),
  ]);
  console.log("Cleared old test data");

  // ========== EDUCATION ==========
  if (!(await Education.findById(EDUCATION_ID))) {
    await Education.create({
      _id: EDUCATION_ID,
      institution: "Sri Venkateswara University",
      location: "Tirupati, Andhra Pradesh",
      degree: "B.Tech Computer Science",
      branch: "Computer Science and Engineering",
      start_date: "2020-08-01",
      end_date: "2024-05-30",
      progress: "Completed",
      is_current: false,
      display_order: 1,
    });
    console.log("Created Education:", EDUCATION_ID);
  }
  if (!(await Education.findById(EDUCATION_DELETE_ID))) {
    await Education.create({
      _id: EDUCATION_DELETE_ID,
      institution: "Delete Test University",
      location: "Test Location",
      degree: "B.Tech Computer Science",
      branch: "Computer Science",
      start_date: "2020-08-01",
      end_date: "2024-05-30",
      progress: "Completed",
      is_current: false,
      display_order: 99,
    });
    console.log("Created Education (delete):", EDUCATION_DELETE_ID);
  }

  // ========== EXPERIENCE ==========
  if (!(await Experience.findById(EXPERIENCE_ID))) {
    await Experience.create({
      _id: EXPERIENCE_ID,
      company: "Agile FAQs Technology Pvt. Ltd.",
      role: "Software Intern",
      location: "Remote",
      type: "Internship",
      start_date: "2026-07-01",
      end_date: "2026-08-02",
      is_current: false,
      description: "Worked on contract testing with Specmatic and OpenAPI.",
      skills: "Java, Spring Boot, OpenAPI, Specmatic",
      display_order: 1,
    });
    console.log("Created Experience:", EXPERIENCE_ID);
  }
  if (!(await Experience.findById(EXPERIENCE_DELETE_ID))) {
    await Experience.create({
      _id: EXPERIENCE_DELETE_ID,
      company: "Delete Test Company",
      role: "Software Intern",
      location: "Remote",
      type: "Internship",
      start_date: "2026-07-01",
      end_date: "2026-08-02",
      is_current: false,
      description: "Test description",
      skills: "Test skills",
      display_order: 99,
    });
    console.log("Created Experience (delete):", EXPERIENCE_DELETE_ID);
  }

  // ========== SKILL ==========
  if (!(await Skill.findById(SKILL_ID))) {
    await Skill.create({
      _id: SKILL_ID,
      name: "Java",
      category: "programming",
      icon_url: "https://example.com/icons/java.svg",
      proficiency: 80,
    });
    console.log("Created Skill:", SKILL_ID);
  }
  if (!(await Skill.findById(SKILL_DELETE_ID))) {
    await Skill.create({
      _id: SKILL_DELETE_ID,
      name: "DeleteTestSkill",
      category: "other",
      icon_url: "https://example.com/icons/test.svg",
      proficiency: 50,
    });
    console.log("Created Skill (delete):", SKILL_DELETE_ID);
  }

  // ========== ABOUT ==========
  if (!(await About.findById(ABOUT_ID))) {
    await About.create({
      _id: ABOUT_ID,
      name: "Kuruba Ramesh",
      title: "Full Stack Developer",
      bio: "Passionate developer with expertise in MERN stack and contract testing.",
      email: "ramesh@email.com",
      github: "https://github.com/KRameshr",
      linkedin: "https://linkedin.com/in/kurubaramesh",
      resume_url: "https://example.com/resume.pdf",
      image_url: "https://res.cloudinary.com/demo/image.jpg",
    });
    console.log("Created About:", ABOUT_ID);
  }

  // ========== PROJECT ==========
  if (!(await Project.findById(PROJECT_ID))) {
    await Project.create({
      _id: PROJECT_ID,
      title: "Portfolio Backend API",
      description:
        "REST API for personal portfolio with Specmatic contract testing.",
      tech_stack: "Node.js, Express, MongoDB, Specmatic",
      github_url: "https://github.com/KRameshr/kramesh-portfolio-backend",
      live_url: "https://kramesh-portfolio-backend.onrender.com",
      image_url: "https://res.cloudinary.com/demo/project.jpg",
      is_featured: true,
    });
    console.log("Created Project:", PROJECT_ID);
  }
  if (!(await Project.findById(PROJECT_DELETE_ID))) {
    await Project.create({
      _id: PROJECT_DELETE_ID,
      title: "Delete Test Project",
      description: "Test project for delete scenario.",
      tech_stack: "Test",
      github_url: "https://github.com/test",
      live_url: "https://test.com",
      image_url: "https://res.cloudinary.com/demo/test.jpg",
      is_featured: false,
    });
    console.log("Created Project (delete):", PROJECT_DELETE_ID);
  }

  // ========== BLOG ==========
  if (!(await Blog.findById(BLOG_ID))) {
    await Blog.create({
      _id: BLOG_ID,
      title: "Getting Started with Specmatic",
      slug: "getting-started-with-specmatic",
      content: "Specmatic is a powerful tool for contract testing...",
      excerpt: "Learn how to implement contract testing with Specmatic.",
      is_published: true,
      cover_image_url: "https://res.cloudinary.com/demo/blog.jpg",
    });
    console.log("Created Blog:", BLOG_ID);
  }
  if (!(await Blog.findById(BLOG_DELETE_ID))) {
    await Blog.create({
      _id: BLOG_DELETE_ID,
      title: "Delete Test Blog",
      slug: "delete-test-blog-2",
      content: "Test content for delete scenario.",
      excerpt: "Test excerpt",
      is_published: false,
      cover_image_url: "https://res.cloudinary.com/demo/test.jpg",
    });
    console.log("Created Blog (delete):", BLOG_DELETE_ID);
  }

  // ========== CERTIFICATION ==========
  if (!(await Certification.findById(CERTIFICATION_ID))) {
    await Certification.create({
      _id: CERTIFICATION_ID,
      institution_name: "Amazon Web Services",
      certificate_name: "AWS Certified Solutions Architect",
      certificate_id: "AWS-123456",
      description: "AWS Solutions Architect certification",
      skills: "AWS, Cloud Architecture",
      start_date: "2024-01-15",
      end_date: "2027-01-15",
      is_expired: false,
      credential_url: "https://www.credly.com/badges/aws-123",
      image_url: "https://res.cloudinary.com/demo/cert.jpg",
      display_order: 1,
    });
    console.log("Created Certification:", CERTIFICATION_ID);
  }
  if (!(await Certification.findById(CERTIFICATION_DELETE_ID))) {
    await Certification.create({
      _id: CERTIFICATION_DELETE_ID,
      institution_name: "Test Issuer",
      certificate_name: "Delete Test Certification",
      certificate_id: "TEST-123",
      description: "Test description",
      skills: "Test skills",
      start_date: "2024-01-01",
      end_date: "2025-01-01",
      is_expired: false,
      credential_url: "https://test.com",
      image_url: "https://res.cloudinary.com/demo/test.jpg",
      display_order: 99,
    });
    console.log("Created Certification (delete):", CERTIFICATION_DELETE_ID);
  }

  // ========== CONTACT ==========
  if (!(await Contact.findById(CONTACT_ID))) {
    await Contact.create({
      _id: CONTACT_ID,
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message for Specmatic contract testing.",
    });
    console.log("Created Contact:", CONTACT_ID);
  }
  if (!(await Contact.findById(CONTACT_DELETE_ID))) {
    await Contact.create({
      _id: CONTACT_DELETE_ID,
      name: "Delete Test User",
      email: "delete@example.com",
      subject: "Delete Test",
      message: "This message will be deleted in tests.",
    });
    console.log("Created Contact (delete):", CONTACT_DELETE_ID);
  }

  // ========== ADMIN ==========
  let admin = await Admin.findById(ADMIN_ID);
  if (!admin) {
    await Admin.create({
      _id: ADMIN_ID,
      email: "admin@kramesh.dev",
      password: await bcrypt.hash("SecurePassword123", 10),
    });
    console.log("Created Admin:", ADMIN_ID);
  } else {
    admin.email = "admin@kramesh.dev";
    admin.password = await bcrypt.hash("SecurePassword123", 10);
    await admin.save();
    console.log("Updated Admin:", ADMIN_ID);
  }

  console.log(" All seeding complete!");
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
