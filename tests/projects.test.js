const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Projects Routes", () => {
  it("should get all projects", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should not create project without token", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({ title: "Test", description: "Test", tech_stack: "React" });
    expect(res.statusCode).toBe(401);
  });
});

//  CORRECT FIX
afterAll(async () => {
  await mongoose.disconnect();
});
