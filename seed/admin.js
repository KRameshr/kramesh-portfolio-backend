require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const connectDB = require("../config/db");

const seedAdmin = async () => {
  await connectDB();

  const existing = await Admin.findOne({ email: "krameshr348@gmail.com" });
  if (existing) {
    console.log("Admin already exists!");
    process.exit();
  }

  const hashed = await bcrypt.hash("Ramesh@2002", 10);
  await Admin.create({ email: "krameshr348@gmail.com", password: hashed });

  console.log("Admin created successfully!");
  process.exit();
};

seedAdmin();
