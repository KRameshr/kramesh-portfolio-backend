// seed/generateTestToken.js
//
// Generates a real, valid admin JWT (same shape as authController.js login)
// for use in Specmatic external examples (openapi_examples/*.json), so
// schema-resiliency "positive" scenarios (POST/PUT/DELETE with valid data)
// can actually authenticate instead of getting a random garbage token.
//
// NOTE: token expires in 7 days (same as login). If contract tests start
// failing with 401 "Token invalid or expired" again after about a week,
// re-run this script and update the Authorization header in the example
// JSON files with the new token.
//
// Run with: node seed/generateTestToken.js

require("dotenv").config();
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const ADMIN_EMAIL = "krameshr348@gmail.com";

const run = async () => {
  await connectDB();

  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    console.error(`No admin found with email ${ADMIN_EMAIL}`);
    process.exit(1);
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("Admin _id:", admin._id.toString());
  console.log("Token:");
  console.log(token);

  process.exit();
};

run().catch((err) => {
  console.error("Failed to generate token:", err);
  process.exit(1);
});
