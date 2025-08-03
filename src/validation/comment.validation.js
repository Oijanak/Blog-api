const Joi = require("joi");

const commentValidation = {
  create: Joi.object({
    content: Joi.string().required().max(500).messages({
      "string.empty": "Comment content is required",
      "any.required": "Comment content is required",
      "string.max": "Comment cannot exceed 500 characters",
    }),
  }),
};
module.exports = commentValidation;
