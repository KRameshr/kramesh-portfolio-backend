// seed/specmaticTestData.js
// Purpose: Ensure fixed-ID records exist in the DB so Specmatic's named
// examples (UPDATE_EDUCATION_SUCCESS, UPDATE_EXPERIENCE_SUCCESS, UPDATE_SKILL_SUCCESS)
// have a real record to update against.
//
// Place this file inside the `seed/` folder (same as admin.js) and run with:
//   node seed/specmaticTestData.js

require("dotenv").config();
const connectDB = require("../config/db");
const Education = require("../models/Education");
const Experience = require("../models/Experience");
const Skill = require("../models/Skill");

const EDUCATION_ID = "64f1a2b3c4d5e6f7a8b9c0d1";
const EXPERIENCE_ID = "64f1a2b3c4d5e6f7a8b9c0d2";
const SKILL_ID = "64f1a2b3c4d5e6f7a8b9c0d3";

// Separate IDs dedicated to DELETE scenarios, so deleting them doesn't
// remove the records the PUT scenarios above depend on.
const EDUCATION_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e1";
const EXPERIENCE_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e2";
const SKILL_DELETE_ID = "64f1a2b3c4d5e6f7a8b9c0e3";

const seed = async () => {
  await connectDB();

  // --- Education ---
  let education = await Education.findById(EDUCATION_ID);
  if (!education) {
    education = await Education.create({
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
    console.log("Created Education record:", EDUCATION_ID);
  } else {
    console.log("Education record already exists:", EDUCATION_ID);
  }

  // --- Experience ---
  let experience = await Experience.findById(EXPERIENCE_ID);
  if (!experience) {
    experience = await Experience.create({
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
    console.log("Created Experience record:", EXPERIENCE_ID);
  } else {
    console.log("Experience record already exists:", EXPERIENCE_ID);
  }

  // --- Skill ---
  let skill = await Skill.findById(SKILL_ID);
  if (!skill) {
    skill = await Skill.create({
      _id: SKILL_ID,
      name: "Java",
      category: "programming",
      icon_url: "https://example.com/icons/java.svg",
      proficiency: 80,
    });
    console.log("Created Skill record:", SKILL_ID);
  } else {
    console.log("Skill record already exists:", SKILL_ID);
  }
  // --- Education (DELETE target) ---
  let educationForDelete = await Education.findById(EDUCATION_DELETE_ID);
  if (!educationForDelete) {
    educationForDelete = await Education.create({
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
    console.log(
      "Created Education (delete target) record:",
      EDUCATION_DELETE_ID,
    );
  } else {
    console.log(
      "Education (delete target) record already exists:",
      EDUCATION_DELETE_ID,
    );
  }

  // --- Experience (DELETE target) ---
  let experienceForDelete = await Experience.findById(EXPERIENCE_DELETE_ID);
  if (!experienceForDelete) {
    experienceForDelete = await Experience.create({
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
    console.log(
      "Created Experience (delete target) record:",
      EXPERIENCE_DELETE_ID,
    );
  } else {
    console.log(
      "Experience (delete target) record already exists:",
      EXPERIENCE_DELETE_ID,
    );
  }

  // --- Skill (DELETE target) ---
  let skillForDelete = await Skill.findById(SKILL_DELETE_ID);
  if (!skillForDelete) {
    skillForDelete = await Skill.create({
      _id: SKILL_DELETE_ID,
      name: "DeleteTestSkill",
      category: "other",
      icon_url: "https://example.com/icons/test.svg",
      proficiency: 50,
    });
    console.log("Created Skill (delete target) record:", SKILL_DELETE_ID);
  } else {
    console.log(
      "Skill (delete target) record already exists:",
      SKILL_DELETE_ID,
    );
  }

  console.log("Seeding complete.");
  process.exit();
};

seed().catch((err) => {
  console.error("Seed script failed:", err);
  process.exit(1);
});
