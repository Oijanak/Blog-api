const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const validate = require("../utils/validate");
const blogValidation = require("../validation/blog.validation");
const { authenticate } = require("../middlewares/authenticate");
const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.post("/", authenticate, validate(blogValidation.create), createBlog);
blogRouter.put(
  "/:id",
  authenticate,
  validate(blogValidation.update, updateBlog)
);
blogRouter.delete("/:id", authenticate, deleteBlog);
module.exports = blogRouter;
