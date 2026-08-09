require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const buildActuatorMappings = require("./utils/actuatorMappings");
const simulateError = require("./middleware/simulateError");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Mongoose Strict Casting Rules (prevent invalid type mutations)
mongoose.Schema.Types.String.set("cast", false);
mongoose.Schema.Types.Number.set("cast", false);
mongoose.Schema.Types.Boolean.set("cast", false);

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", simulateError);

// Root & Health Monitoring Endpoints
app.get("/", (req, res) => res.json({ message: "Server is running" }));
app.get("/health", (req, res) =>
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() }),
);
app.get("/actuator/mappings", (req, res) =>
  res.json(buildActuatorMappings(app)),
);

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/about", require("./routes/about"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/education", require("./routes/education"));
app.use("/api/certifications", require("./routes/certifications"));
app.use("/api/experience", require("./routes/experience"));

// 404 Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Centralized Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
