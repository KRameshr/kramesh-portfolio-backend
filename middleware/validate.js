const validate = (schema) => {
  return (req, res, next) => {
    const body = req.body || {};
    const required = schema.required || {};
    const optional = schema.optional || {};

    // 1. Check required fields — must be present AND correct type
    for (const [field, expectedType] of Object.entries(required)) {
      const value = body[field];

      if (value === undefined || value === null || value === "") {
        return res.status(400).json({
          message: `Validation failed: ${field} is required`,
        });
      }

      if (typeof value !== expectedType) {
        return res.status(400).json({
          message: `Validation failed: ${field} must be a ${expectedType}, got ${typeof value}`,
        });
      }
    }

    for (const [field, expectedType] of Object.entries(optional)) {
      if (!(field in body)) continue; // key absent — OK, skip

      const value = body[field];

      if (value === null) {
        return res.status(400).json({
          message: `Validation failed: ${field} cannot be null`,
        });
      }

      if (value !== undefined && typeof value !== expectedType) {
        return res.status(400).json({
          message: `Validation failed: ${field} must be a ${expectedType}, got ${typeof value}`,
        });
      }
    }

    next();
  };
};

module.exports = { validate };
