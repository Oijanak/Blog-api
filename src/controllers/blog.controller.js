const Blog = require("../models/Blog.model");
const Comment = require("../models/Comment.model");
const ApiError = require("../utils/ApiError");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const { search, tags, sort } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (tags) {
      query.tags = { $in: tags.split(",").map((e) => e.toLowerCase()) };
    }

    let sortBy = "-createdAt";

    if (sort === "oldest") {
      sortBy = "createdAt";
    }

    const blogs = await Blog.find(query)
      .sort(sortBy)
      .populate("author", "username")
      .populate("comments");

    res.status(200).json({
      success: true,
      total: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      });

    if (!blog) {
      return next(new ApiError("Blog is not found", 404));
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    req.body.author = req.user.id;

    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: "sccess",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ApiError("Blog not found", 404));
    }

    if (blog.author.toString() !== req.user.id) {
      return next(new ApiError("Not Authorized to update this blog", 403));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ApiError("Blog not found", 404));
    }

    if (blog.author.toString() !== req.user.id) {
      return next(new ApiError("Not authorized to delete this blog", 403));
    }

    await Comment.deleteMany({ blog: blog._id });

    await blog.deleteOne();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
