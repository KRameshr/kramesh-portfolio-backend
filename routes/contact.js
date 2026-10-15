const express = require("express");
const { rateLimit } = require("express-rate-limit");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contactController");
const protect = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many contact requests. Please try again later." },
});

router.post("/", contactRateLimit, validate(schemas.createContact), sendMessage);
router.get("/messages", protect, getMessages);
router.delete("/messages/:id", protect, deleteMessage);

module.exports = router;
