const nodemailer = require("nodemailer");

// POST /api/contact (public)
const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message)
    return res
      .status(400)
      .json({ message: "Name, email and message are required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || "New Message"} from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};

module.exports = { sendMessage };
