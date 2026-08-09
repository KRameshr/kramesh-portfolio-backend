/**
 * Validation middleware for Specmatic contract tests.
 * Validates both required and optional fields for presence and type.
 *
 * Required fields: must be present (not null/undefined/empty) AND correct type.
 * Optional fields: if the key IS present in the body, value must not be null
 *   and must match the expected type. If the key is absent, it's skipped.
 *
 * Usage:
 *   const { validate } = require("../middleware/validate");
 *   const schemas = require("./validationSchemas");
 *   router.post("/", validate(schemas.createProject), createProject);
 */

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

    // 2. Check optional fields — if key is present, value must not be null
    //    and must match the expected type. Absent keys are skipped.
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
