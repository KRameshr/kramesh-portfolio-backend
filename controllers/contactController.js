const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact
const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email and message are required",
    });
  }

  try {
    console.log("Contact request received:", {
      name,
      email,
      subject,
    });

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    console.log("Saved to MongoDB");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || "New Message"} from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email sent");

    return res.status(201).json({
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("Full Error:", err);
    console.error("Error Message:", err.message);

    return res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

// GET /api/contact/messages
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/contact/messages/:id
const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Message deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};
