const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("supertest");

jest.mock("../models/About", () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../config/cloudinary", () => {
  const multer = require("multer");
  return {
    uploadAbout: multer({ storage: multer.memoryStorage() }),
    cloudinary: { uploader: { destroy: jest.fn() } },
  };
});

process.env.JWT_SECRET = "about-route-test-secret";

const About = require("../models/About");
const aboutRouter = require("../routes/about");
const app = express();
app.use(express.json());
app.use("/api/about", aboutRouter);

const profile = {
  name: "Kuruba Ramesh",
  title: "Full Stack Developer",
  email: "ramesh@example.com",
  github: "https://github.com/KRameshr",
  linkedin: "https://linkedin.com/in/kurubaramesh",
  resume_url: "https://example.com/resume.pdf",
  bio: "Building web applications.",
};
const token = jwt.sign({ id: "admin-id" }, process.env.JWT_SECRET);

describe("Admin About API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    About.findOneAndUpdate.mockResolvedValue({ _id: "profile-id", ...profile });
  });

  it("updates and returns all About profile fields from a JSON request", async () => {
    const response = await request(app)
      .put("/api/about")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(profile);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(profile);
    expect(About.findOneAndUpdate).toHaveBeenCalledWith(
      {},
      profile,
      expect.objectContaining({ upsert: true, runValidators: true }),
    );
  });

  it("parses and validates multipart profile fields before updating", async () => {
    const multipart = request(app)
      .put("/api/about")
      .set("Authorization", `Bearer ${token}`);
    Object.entries(profile).forEach(([field, value]) => multipart.field(field, value));

    const response = await multipart;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(profile);
    expect(About.findOneAndUpdate).toHaveBeenCalledWith(
      {},
      profile,
      expect.objectContaining({ upsert: true, runValidators: true }),
    );
  });

  it("rejects a missing request body", async () => {
    const response = await request(app)
      .put("/api/about")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed: request body is required");
    expect(About.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("rejects invalid profile fields without saving", async () => {
    const response = await request(app)
      .put("/api/about")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...profile, email: false });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email must be of type string/i);
    expect(About.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("keeps About updates protected", async () => {
    const response = await request(app).put("/api/about").send(profile);

    expect(response.status).toBe(401);
    expect(About.findOneAndUpdate).not.toHaveBeenCalled();
  });
});
