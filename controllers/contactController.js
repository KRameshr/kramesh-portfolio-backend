const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 10000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const smtpErrorDetails = (error) => ({
  code: error.code || "SMTP_ERROR",
  responseCode: error.responseCode || null,
  command: error.command || null,
});

const verifySmtpConfiguration = async () => {
  const senderConfigured = Boolean(process.env.EMAIL_USER);
  const passwordConfigured = Boolean(process.env.EMAIL_PASS);
  const recipientConfigured = Boolean(process.env.CONTACT_RECEIVER_EMAIL);
  const missingVariables = [
    ["EMAIL_USER", senderConfigured],
    ["EMAIL_PASS", passwordConfigured],
    ["CONTACT_RECEIVER_EMAIL", recipientConfigured],
  ]
    .filter(([, isConfigured]) => !isConfigured)
    .map(([name]) => name);

  console.info("[contact-email] SMTP configuration", {
    provider: "gmail",
    senderConfigured,
    passwordConfigured,
    recipientConfigured,
  });

  if (missingVariables.length > 0) {
    console.error("[contact-email] SMTP verification skipped", {
      missingVariables,
    });
    return false;
  }

  try {
    await transporter.verify();
    console.info("[contact-email] SMTP verification succeeded", {
      provider: "gmail",
    });
    return true;
  } catch (error) {
    console.error("[contact-email] SMTP verification failed", {
      provider: "gmail",
      ...smtpErrorDetails(error),
    });
    return false;
  }
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

// POST /api/contact
const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanSubject = typeof subject === "string" ? subject.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({
      message: "Name, email and message are required",
    });
  }

  if (
    cleanName.length > MAX_NAME_LENGTH ||
    cleanEmail.length > 254 ||
    cleanSubject.length > MAX_SUBJECT_LENGTH ||
    cleanMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({
      message: "One or more fields exceed the allowed length",
    });
  }

  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  const senderEmail = process.env.EMAIL_USER;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const missingVariables = [
    ["EMAIL_USER", senderEmail],
    ["EMAIL_PASS", process.env.EMAIL_PASS],
    ["CONTACT_RECEIVER_EMAIL", receiverEmail],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missingVariables.length > 0 || !EMAIL_PATTERN.test(receiverEmail || "")) {
    console.error("[contact-email] SMTP configuration is incomplete", {
      missingVariables,
      recipientFormatValid: EMAIL_PATTERN.test(receiverEmail || ""),
    });
    return res.status(503).json({
      message: "The contact service is temporarily unavailable. Please try again later.",
    });
  }

  let messageSaved = false;
  let smtpAttempted = false;
  try {
    await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });
    messageSaved = true;
    smtpAttempted = true;
    const result = await transporter.sendMail({
      from: senderEmail,
      to: receiverEmail,
      replyTo: cleanEmail,
      subject: `Portfolio Contact: ${cleanSubject || "New Message"} from ${cleanName}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(cleanSubject || "N/A")}</p>
        <p><strong>Message:</strong> ${escapeHtml(cleanMessage).replace(/\n/g, "<br>")}</p>
      `,
    });

    const acceptedRecipients = (result.accepted || []).map((recipient) =>
      String(recipient).toLowerCase(),
    );
    if (!acceptedRecipients.includes(receiverEmail.toLowerCase())) {
      throw Object.assign(
        new Error("Mail provider did not accept the configured recipient"),
        { code: "ERECIPIENTNOTACCEPTED" },
      );
    }

    return res.status(201).json({
      message: "Your message was accepted for delivery.",
    });
  } catch (err) {
    console.error("[contact-email] Contact notification failed", {
      stage: smtpAttempted ? "smtp-send" : "database-save",
      ...smtpErrorDetails(err),
    });
    return res.status(503).json({
      message: messageSaved
        ? "We saved your message, but could not email it. Please do not resubmit; try again later."
        : "The contact service is temporarily unavailable. Please try again later.",
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
  verifySmtpConfiguration,
};
