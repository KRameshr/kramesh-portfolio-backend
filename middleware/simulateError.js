module.exports = (req, res, next) => {
  if (req.headers["x-simulate-error"] === "true") {
    return res.status(500).json({ message: "Simulated server error" });
  }
  next();
};
