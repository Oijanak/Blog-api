const Comment = require("../models/Comment.model");
const Blog = require("../models/Blog.model");
const ApiError = require("../utils/ApiError");

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next(new ApiError("Blog not found", 404));
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      blog: blogId,
    });

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new ApiError("Comment not found", 404));
    }

    const blog = await Blog.findById(comment.blog);

    if (
      comment.author.toString() !== req.user.id &&
      blog.author.toString() !== req.user.id
    ) {
      return next(new ApiError("Not Authorized to delete this comment", 403));
    }

    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: comment._id },
    });

    await comment.deleteOne();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
