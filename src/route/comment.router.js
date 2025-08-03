const express = require("express");
const {
  addComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/authenticate");
const commentRouter = express.Router();
commentRouter.post("/:blogId", authenticate, addComment);
commentRouter.delete("/:id", authenticate, deleteComment);
module.exports = commentRouter;
