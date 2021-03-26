const blogResolvers = require("./blog");
const commentResolvers = require("./comment");
const userResolver = require("./user");

module.exports = [
    userResolver,
    blogResolvers,
    commentResolvers
]