const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const jwt_secret = process.env.JWT_SECRET;

exports.authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Token is required", 400));
  }
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    next(error);
  }
};
