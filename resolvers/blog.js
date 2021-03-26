// @ts-nocheck
const { AuthenticationError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authentication");

const blogResolvers = {
  Query: {
    blogs: async (_, args, { models, payload, errorName }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to view details");
      }
      return await models.Blog.getBlogs();
    },
    blog: async (_, { id }, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to view details");
      }
      return await models.Blog.getBlog(id);
    },
  },
  Blog: {
    user: async ({ user }, _, { models }) => {
      return await models.User.getUser(user._id);
    },
    comment: async ({_id}, _, { models }) => {
      // console.log(parent);
      return await models.Comment.getCommentByBlog(_id);
    },
  },
  Mutation: {
    createBlog: async (_, { input }, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to create blog");
      }
      return await models.Blog.createBlog(input, payload);
    },
    updateBlog: combineResolvers(
      isAuthenticated,
      async (_, { input }, { models, payload }) => {
        if (!payload) {
          throw new AuthenticationError("Pls, login to view user details");
        }
        return await models.Blog.updateBlog(input, payload);
      }
    ),
    deleteBlog: async (_, { id }, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to view user details");
      }
      return await models.Blog.deleteBlog(id, payload);
    },
  },
};

module.exports = blogResolvers;
