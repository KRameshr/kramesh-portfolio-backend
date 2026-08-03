// tests/specmaticGlobalSetup.js
//
// This runs once, before all Jest test suites, and executes Specmatic's
// contract tests against the already-running Express server
// (start it separately with `node server.js` before running `npm test`).
//
// Based on the documented API in the `specmatic` npm package README:
// https://github.com/specmatic/specmatic-node

const { test } = require("specmatic");

module.exports = async () => {
  console.log("Running Specmatic contract tests against openapi.yaml...");

  const results = await test(undefined, undefined, "openapi.yaml", [
    "--testBaseURL=http://localhost:3000/api",
  ]);

  console.log("Specmatic contract test results:", results);
};
