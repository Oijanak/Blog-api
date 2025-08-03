const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const validate = require("../utils/validate");
const authValidation = require("../validation/auth.validation");
const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(authValidation.validateRegister),
  register
);
authRouter.post("/login", validate(authValidation.validateLogin), login);

module.exports = authRouter;
