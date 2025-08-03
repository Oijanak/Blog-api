const Joi = require("joi");

const authValidation = {
  validateRegister: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    username: Joi.string().required().messages({
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please include a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),

  validateLogin: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please include a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};
module.exports = authValidation;
