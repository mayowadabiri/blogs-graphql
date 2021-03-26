// const { ForbiddenError } = require("apollo-server");
const { AuthenticationError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authentication");

const userResolver = {
  Query: {
    _: async () => {
      return true;
    },
    user: async (parent, { id }, { models, payload }) => {
      if (!payload) {
        throw new AuthenticationError("Pls, login to view user details");
      }
      const user = await models.User.getUser(id);
      return user;
    },
  },
  User: {
    createdAt: async (parent, _, { models }) => {
      return await new Date(parent.createdAt).toLocaleString();
    },
  },
  Mutation: {
    createUser: async (_, { input }, { models }) => {
      return await models.User.createUser(input);
    },
    login: async (_, { input }, { models }) => {
      console.log("reached");
      return await models.User.login(input);
    },
    verifyEmail: async (_, { code }, { models }) => {
      return await models.User.verifyEmail(code);
    },
  },
};

module.exports = userResolver;
