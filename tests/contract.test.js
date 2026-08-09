// tests/contract.test.js
const { showTestResults } = require("specmatic");

showTestResults(test);

// Background open handles and connections cleanup
afterAll(async () => {
  // Jest event loop exit avvadaniki short delay
  await new Promise((resolve) => setTimeout(resolve, 500));
});
