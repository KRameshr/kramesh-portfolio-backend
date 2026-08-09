const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// Create transporter only if email credentials exist
const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

const sendMessage = async (req, res) => {
  // GUARD: req.body undefined aina handle cheyyali (Specmatic test fix)
  const body = req.body || {};
  const { name, email, subject, message } = body;

  // Validation - subject null aina accept cheyyali (optional field)
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email and message are required",
    });
  }

  try {
    // Save to DB first (always works)
    await Contact.create({
      name,
      email,
      subject: subject || undefined,
      message,
    });

    // Email ONLY in production, NOT in test env
    if (process.env.NODE_ENV !== "test" && transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject || "No Subject"} from ${name}`,
          html: `<h3>New Contact Message</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
                 <p><strong>Message:</strong> ${message}</p>`,
        });
      } catch (emailErr) {
        console.log("Email failed (ignored, contact saved):", emailErr.message);
      }
    }

    return res.status(201).json({
      message: "Message sent successfully!",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getMessages, deleteMessage };
