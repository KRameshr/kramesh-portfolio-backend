// middleware/simulateError.js
// TEST-ONLY: Lets Specmatic contract tests exercise the 500 (server error) response
// path without needing a real crash when caller sends X-Simulate-Error: true header.

module.exports = (req, res, next) => {
  if (req.headers["x-simulate-error"] === "true") {
    return res.status(500).json({ message: "Simulated server error" });
  }
  next();
};
