const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: "failed",
      message: "Validation Error",
      details: errors,
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "failed",
      message: `Invalid ${err.path} : ${err.value}`,
    });
  }

  if (err.code === 11000) {
    const key = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    return res.status(400).json({
      status: "failed",
      message: `duplicate field value ${key}:${value}`,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(400).json({ status: "failed", message: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(400).json({ status: "failed", message: "Token expired" });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(err.status)
      .json({ status: "failed", message: "Invalid input JSON format" });
  }

  res.status(500).json({
    status: "error",
    message: "Server Error",
  });
};

module.exports = errorHandler;
