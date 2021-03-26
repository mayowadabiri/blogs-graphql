"use strict";

var blogResolvers = require("./blog");

var commentResolvers = require("./comment");

var userResolver = require("./user");

module.exports = [userResolver, blogResolvers, commentResolvers];