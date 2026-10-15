const optionalUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.startsWith("multipart/form-data")) {
      uploadMiddleware(req, res, next);
    } else {
      next();
    }
  };
};

module.exports = optionalUpload;
