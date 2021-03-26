const { AuthenticationError } = require("apollo-server");
// const { models } = require("mongoose");

const commentResolvers = {
  Query: {
    comments: async (_, args, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to view details");
      }
      return await models.Comment.getAllComments();
    },
  },
  Mutation: {
    createComment: async (parent, { input }, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to  comment on this blog");
      }
      return await models.Comment.createComment(input, payload);
    },
  },
  Comment: {
    user: async ({ user }, _, { models }) => {
      return await models.User.getUser(user._id);
    },
    blog: async ({ blog }, _, { models }) => {
      return await models.Blog.getBlog(blog._id);
    },
  },
};

module.exports = commentResolvers;
