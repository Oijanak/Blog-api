const express = require("express");
const authRouter = require("./auth.router");
const api = express.Router();
api.use("/auth", authRouter);
module.exports = api;
