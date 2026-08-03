// tests/contract.test.js
//
// This file surfaces Specmatic's contract test results inside Jest's own
// test reporter/IDE view, by passing Jest's `test` function to
// Specmatic's `showTestResults` helper.
//
// The actual contract tests are executed once in tests/specmaticGlobalSetup.js
// (configured as Jest's globalSetup script). This file just displays those
// results as individual named Jest test cases.
//
// Based on the documented API in the `specmatic` npm package README:
// https://github.com/specmatic/specmatic-node

const { showTestResults } = require("specmatic");

showTestResults(test);
