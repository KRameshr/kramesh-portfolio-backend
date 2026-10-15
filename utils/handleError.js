// utils/handleError.js
//
// Centralized error responder for controllers.
//
// Root cause this fixes: Mongoose throws a `ValidationError` when required
// fields are missing/invalid, and a `CastError` when a malformed ObjectId
// is passed (e.g. in a route param). These are CLIENT mistakes (bad input),
// not server failures, so they should map to HTTP 400 - not 500.
//
// Previously every controller did:
//   catch (err) { res.status(500).json({ message: err.message }); }
// which returned 500 even for plain "missing required field" errors.

const handleError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = handleError;
