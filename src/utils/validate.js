const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError("Request body is missing", 400));
    }
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new ApiError("Validation Error", 400, errors));
    }
    next();
  };
};

module.exports = validate;
