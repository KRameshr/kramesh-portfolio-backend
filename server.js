require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const buildActuatorMappings = require("./utils/actuatorMappings");

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectDB();

const mongoose = require("mongoose");
mongoose.Schema.Types.String.set("cast", false);
mongoose.Schema.Types.Number.set("cast", false);
mongoose.Schema.Types.Boolean.set("cast", false);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.json({ message: "Server is running" }));

// Specmatic API-coverage endpoint
app.get("/actuator/mappings", (req, res) => res.json(buildActuatorMappings()));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/about", require("./routes/about"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/education", require("./routes/education"));
app.use("/api/certifications", require("./routes/certifications"));
app.use("/api/experience", require("./routes/experience"));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
