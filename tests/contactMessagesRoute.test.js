const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("supertest");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({ sendMail: jest.fn() })),
}));
jest.mock("../models/Contact", () => ({
  create: jest.fn(),
  find: jest.fn(),
}));

process.env.JWT_SECRET = "dashboard-route-test-secret";

const Contact = require("../models/Contact");
const contactRouter = require("../routes/contact");
const app = express();
app.use(express.json());
app.use("/api/contact", contactRouter);

describe("dashboard messages endpoint", () => {
  beforeEach(() => jest.clearAllMocks());

  it("uses the protected contact messages route rather than an unregistered admin route", async () => {
    const correctRoute = await request(app).get("/api/contact/messages");
    const oldDashboardRoute = await request(app).get("/api/admin/messages");

    expect(correctRoute.status).toBe(401);
    expect(oldDashboardRoute.status).toBe(404);
  });

  it("returns the API message list for an authenticated admin", async () => {
    const messages = [
      { _id: "message-1", name: "Visitor", message: "Hello" },
      { _id: "message-2", name: "Another visitor", message: "Hi" },
    ];
    Contact.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(messages),
    });
    const token = jwt.sign({ id: "admin-id" }, process.env.JWT_SECRET);

    const response = await request(app)
      .get("/api/contact/messages")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(messages);
    expect(Contact.find).toHaveBeenCalledTimes(1);
  });
});
