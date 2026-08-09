// tests/specmaticGlobalSetup.js
//
// This runs once, before all Jest test suites. It:
// 1. Re-seeds the database with test data
// 2. Checks if Express server is already running on port 3000; if not, starts one
// 3. Executes Specmatic's contract tests against the server
// 4. Stops the server if we started it internally

const { test } = require("specmatic");
const { execSync } = require("child_process");
const path = require("path");
const http = require("http");

let serverInstance = null;

const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, () => resolve(true));
    req.on("error", () => resolve(false));
    req.end();
  });
};

module.exports = async () => {
  // 1. Re-seed the database so DELETE tests have fresh records
  console.log("Re-seeding database before contract tests...");
  try {
    execSync("node seed/specmaticTestData.js", {
      cwd: path.resolve(__dirname, ".."),
      stdio: "inherit",
    });
    console.log("✅ Database re-seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  }

  // 2. Check if server is already running
  const alreadyRunning = await isPortInUse(3000);

  if (alreadyRunning) {
    console.log(
      "ℹ️ Express server is already running on port 3000. Reusing existing server.",
    );
  } else {
    console.log("Starting Express server for contract tests...");
    const app = require("../server");
    await new Promise((resolve, reject) => {
      serverInstance = app.listen(3000, (err) => {
        if (err) return reject(err);
        console.log("✅ Server started on port 3000");
        resolve();
      });
      global.__TEST_SERVER__ = serverInstance;
    });
  }

  // 3. Run Specmatic contract tests
  console.log("Running Specmatic contract tests against openapi.yaml...");
  const results = await test(undefined, undefined, "openapi.yaml", [
    "--testBaseURL=http://localhost:3000/api",
  ]);
  console.log("Specmatic contract test results:", results);

  // 4. Close the server ONLY if we started it ourselves
  if (serverInstance) {
    await new Promise((resolve) => {
      serverInstance.close(() => {
        console.log("✅ Server stopped after contract tests");
        resolve();
      });
    });
  }
};
