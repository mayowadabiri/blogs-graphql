const { gql } = require("apollo-server-express");

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
  }
  extend type Mutation {
    createUser(input: CreateUserInput): CreateUserResponse!
    login(input: LoginInput): LoginResponse!
    verifyEmail(code: Int!): MutationResponse!
  }

  type CreateUserResponse {
    message: String!
    status: Boolean!
    user: User!
  }

  type LoginResponse {
    token: String!
    message: String!
    success: Boolean!
  }

  type User {
    _id: ID!
    email: String!
    fullName: String!
    username: String!
    gender: Gender!
    age: Int!
    createdAt: String!
  }

  enum Gender {
    MALE
    FEMALE
    BISEXUAL
  }

  input CreateUserInput {
    email: String!
    fullName: String!
    username: String!
    gender: Gender!
    age: Int!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

module.exports = userSchema;
