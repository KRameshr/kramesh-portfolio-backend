/**
 * SEED SCRIPT - Run before Specmatic tests
 * Creates a test admin user for login tests
 *
 * Usage: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ DB Connected for seeding");

    // Clear existing admin
    await Admin.deleteMany({});

    // Create test admin (credentials must match openapi.yaml example)
    const hashedPassword = await bcrypt.hash("SecurePassword123", 10);
    await Admin.create({
      email: "admin@kramesh.dev",
      password: hashedPassword,
    });

    console.log("✅ Test admin user created:");
    console.log("   Email: admin@kramesh.dev");
    console.log("   Password: SecurePassword123");
    console.log("");
    console.log("Now run: npm test");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
