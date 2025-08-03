const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET || "";
const expiresIn = process.env.JWT_EXPIRES_IN || "30m";

const generateToken = (id) => {
  return jwt.sign({ id }, jwt_secret, { expiresIn });
};

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError("Invalid credentials", 400));
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
