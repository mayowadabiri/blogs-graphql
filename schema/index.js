const { gql } = require("apollo-server-express");
const blogSchema = require("./blog");
const commentSchema = require("./comment");
const userSchema = require("./user");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type MutationResponse {
    code: Int!
    message: String!
    success: Boolean!
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, blogSchema, commentSchema];
