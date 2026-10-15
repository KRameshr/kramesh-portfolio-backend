const validate = (schema) => {
  return (req, res, next) => {
    // Guard against a missing, null, or empty body BEFORE touching req.body[field].
    // Without this, req.body === null (e.g. a literal JSON `null` payload, or a
    // request sent with no body at all) causes `req.body[field]` below to throw
    // a TypeError, which the global error handler was reporting as a 500 instead
    // of the 400 Specmatic expects for an omitted body.
    if (
      req.body === undefined ||
      req.body === null ||
      (typeof req.body === "object" && Object.keys(req.body).length === 0)
    ) {
      return res.status(400).json({
        message: "Validation failed: request body is required",
      });
    }

    const { required = {}, optional = {} } = schema;

    // Helper Function: Check Types (Handles FormData String conversions)
    const isValidType = (val, expectedType) => {
      if (expectedType === "boolean") {
        return typeof val === "boolean" || val === "true" || val === "false";
      }
      if (expectedType === "number") {
        // Number(true) === 1 and Number(false) === 0, so without this guard
        // a boolean silently passes as a valid "number" — which is exactly
        // what let `display_order: true/false` through as 200/201 instead
        // of the 400 Specmatic expects for a boolean-mutated number field.
        if (typeof val === "boolean") return false;
        return val !== "" && !isNaN(Number(val));
      }
      return typeof val === expectedType;
    };

    // 1. Validate Required Fields
    for (const [field, type] of Object.entries(required)) {
      const value = req.body[field];

      if (value === undefined || value === null || value === "") {
        return res.status(400).json({
          message: `Validation failed: ${field} is required`,
        });
      }

      if (!isValidType(value, type)) {
        return res.status(400).json({
          message: `Validation failed: ${field} must be a ${type}`,
        });
      }
    }

    // 2. Validate Optional Fields
    // If present and non-null, must be the correct type. If null (or omitted),
    // it's accepted as-is — these fields are declared `nullable: true` in
    // openapi.yaml, so null is valid input, not a validation failure.
    for (const [field, type] of Object.entries(optional)) {
      const value = req.body[field];

      if (value !== undefined && value !== null && value !== "") {
        if (!isValidType(value, type)) {
          return res.status(400).json({
            message: `Validation failed: ${field} must be of type ${type}`,
          });
        }
      }
    }

    next();
  };
};

module.exports = { validate };
