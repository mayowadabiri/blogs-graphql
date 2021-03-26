"use strict";

var User = require("./user");

var Blog = require("./blog");

var Comment = require("./comment");

var model = {
  User: User,
  Blog: Blog,
  Comment: Comment
};
module.exports = model;