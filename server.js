const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const { verifySmtpConfiguration } = require("./controllers/contactController");

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.json({ message: "Server is running" }));

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
  verifySmtpConfiguration();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
