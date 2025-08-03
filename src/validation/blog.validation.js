const Joi = require("joi");

const blogValidation = {
  create: Joi.object({
    title: Joi.string().required().max(100).messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
      "string.max": "Title cannot exceed 100 characters",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    content: Joi.string().required().messages({
      "string.empty": "Content is required",
      "any.required": "Content is required",
    }),
    tags: Joi.array().items(Joi.string()).default([]),
  }),

  update: Joi.object({
    title: Joi.string().max(100).messages({
      "string.max": "Title cannot exceed 100 characters",
    }),
    description: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  }).min(1),
};
module.exports = blogValidation;
