const request = require("supertest");
const app = require("../server");

describe("Auth Routes", () => {
  it("should login with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "krameshr348@gmail.com", password: "Ramesh2002" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with wrong credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrong@gmail.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});
