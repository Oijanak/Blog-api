const express = require("express");
const authRouter = require("./auth.router");
const blogRouter = require("./blog.router");
const commentRouter = require("./comment.router");
const api = express.Router();
api.use("/auth", authRouter);
api.use("/blogs", blogRouter);
api.use("/comments", commentRouter);
module.exports = api;
