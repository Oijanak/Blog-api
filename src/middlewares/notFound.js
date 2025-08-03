module.exports = notFound = (req, res, next) => {
  return res.status(404).json({
    status: "failed",
    message: `Endpoint with ${req.method} ${req.originalUrl} not found`,
  });
};
