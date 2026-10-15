const express = require("express");
const request = require("supertest");

const mockSendMail = jest.fn();
const mockVerify = jest.fn();
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: mockSendMail,
    verify: mockVerify,
  })),
}));
jest.mock("../models/Contact", () => ({ create: jest.fn() }));

process.env.EMAIL_USER = "portfolio@example.com";
process.env.EMAIL_PASS = "test-password";
process.env.CONTACT_RECEIVER_EMAIL = "owner@example.com";

const Contact = require("../models/Contact");
const contactRouter = require("../routes/contact");
const { verifySmtpConfiguration } = require("../controllers/contactController");
const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use("/api/contact", contactRouter);

const postContact = (payload, ip) =>
  request(app)
    .post("/api/contact")
    .set("X-Forwarded-For", ip)
    .send(payload);

const postContactWithEmailEnabled = async (payload, ip) => {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    return await postContact(payload, ip);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
};

describe("Contact submission API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Contact.create.mockResolvedValue({});
    mockSendMail.mockResolvedValue({ accepted: ["owner@example.com"] });
    mockVerify.mockResolvedValue(true);
  });

  it("rejects missing fields and malformed email addresses", async () => {
    const missing = await postContact(
      { name: "Visitor", email: "visitor@example.com" },
      "198.51.100.11",
    );
    const malformed = await postContact(
      {
        name: "Visitor",
        email: "not-an-email",
        message: "Hello there",
      },
      "198.51.100.12",
    );

    expect(missing.status).toBe(400);
    expect(malformed.status).toBe(400);
    expect(Contact.create).not.toHaveBeenCalled();
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("emails the configured recipient and sets the visitor as reply-to", async () => {
    const response = await postContactWithEmailEnabled(
      {
        name: "  Visitor  ",
        email: "visitor@example.com",
        subject: "Question",
        message: "Hello <there>",
      },
      "198.51.100.13",
    );

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/saved/i);
    expect(Contact.create).toHaveBeenCalledWith({
      name: "Visitor",
      email: "visitor@example.com",
      subject: "Question",
      message: "Hello <there>",
    });
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "owner@example.com",
        replyTo: "visitor@example.com",
        html: expect.stringContaining("Hello &lt;there&gt;"),
      }),
    );
  });

  it("logs when the mail provider does not accept the recipient after saving", async () => {
    mockSendMail.mockResolvedValueOnce({ accepted: [], rejected: ["owner@example.com"] });
    const errorLog = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await postContactWithEmailEnabled(
      {
        name: "Visitor",
        email: "visitor@example.com",
        message: "Hello there",
      },
      "198.51.100.14",
    );

    expect(response.status).toBe(201);
    await new Promise(setImmediate);
    expect(errorLog).toHaveBeenCalledWith(
      "[contact-email] SMTP recipient was not accepted",
      { code: "ERECIPIENTNOTACCEPTED" },
    );
    expect(response.body.stack).toBeUndefined();
    errorLog.mockRestore();
  });

  it("logs safe SMTP metadata when authentication fails after saving", async () => {
    mockSendMail.mockRejectedValueOnce(
      Object.assign(new Error("credentials should not be logged"), {
        code: "EAUTH",
        responseCode: 535,
        command: "AUTH PLAIN",
      }),
    );
    const errorLog = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await postContactWithEmailEnabled(
      {
        name: "Visitor",
        email: "visitor@example.com",
        message: "Hello there",
      },
      "198.51.100.15",
    );

    expect(response.status).toBe(201);
    await new Promise(setImmediate);
    expect(response.body.message).toMatch(/saved/i);
    expect(response.body.message).not.toMatch(/credentials should not be logged/i);
    expect(errorLog).toHaveBeenCalledWith(
      "[contact-email] Contact notification failed",
      expect.objectContaining({
        stage: "smtp-send",
        code: "EAUTH",
        responseCode: 535,
        command: "AUTH PLAIN",
      }),
    );
    expect(JSON.stringify(errorLog.mock.calls)).not.toContain("credentials should not be logged");
    errorLog.mockRestore();
  });

  it("saves the message without sending when no contact recipient is configured", async () => {
    const configuredRecipient = process.env.CONTACT_RECEIVER_EMAIL;
    delete process.env.CONTACT_RECEIVER_EMAIL;

    const response = await postContact(
      {
        name: "Visitor",
        email: "visitor@example.com",
        message: "Hello there",
      },
      "198.51.100.16",
    );

    process.env.CONTACT_RECEIVER_EMAIL = configuredRecipient;
    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/saved/i);
    expect(Contact.create).toHaveBeenCalledTimes(1);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("logs SMTP verification failures with safe error metadata", async () => {
    mockVerify.mockRejectedValueOnce(
      Object.assign(new Error("credentials should not be logged"), {
        code: "EAUTH",
        responseCode: 535,
        command: "AUTH PLAIN",
      }),
    );
    const errorLog = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(verifySmtpConfiguration()).resolves.toBe(false);

    expect(errorLog).toHaveBeenCalledWith(
      "[contact-email] SMTP verification failed",
      {
        provider: "gmail",
        code: "EAUTH",
        responseCode: 535,
        command: "AUTH PLAIN",
      },
    );
    expect(JSON.stringify(errorLog.mock.calls)).not.toContain("credentials should not be logged");
    errorLog.mockRestore();
  });

  it("limits repeated submissions from the same IP", async () => {
    const submissions = await Promise.all(
      Array.from({ length: 6 }, () =>
        postContact({}, "198.51.100.99"),
      ),
    );

    expect(submissions.map(({ status }) => status)).toContain(429);
  });
});
