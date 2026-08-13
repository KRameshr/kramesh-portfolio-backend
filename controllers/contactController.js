const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// SMTP Transporter Config (Port 465 SSL connection)
const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

const sendMessage = async (req, res) => {
  const body = req.body || {};
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email and message are required",
    });
  }

  try {
    // 1. Save to Database
    const savedContact = await Contact.create({
      name,
      email,
      subject: subject || undefined,
      message,
    });
    res.status(201).json({
      message: "Message sent successfully!",
    });

    // 3. Send Email asynchronously in background (Without await)
    if (process.env.NODE_ENV !== "test" && transporter) {
      transporter
        .sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject || "No Subject"} from ${name}`,
          html: `<h3>New Contact Message</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
                 <p><strong>Message:</strong> ${message}</p>`,
        })
        .then(() => {
          console.log("Email sent successfully to Gmail!");
        })
        .catch((emailErr) => {
          console.error("Nodemailer Email Error:", emailErr.message);
        });
    }
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
