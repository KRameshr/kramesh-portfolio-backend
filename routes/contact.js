const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contactController");
const protect = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const schemas = require("./validationSchemas");

router.post("/", validate(schemas.createContact), sendMessage);
router.get("/messages", protect, getMessages);
router.delete("/messages/:id", protect, deleteMessage);

module.exports = router;
