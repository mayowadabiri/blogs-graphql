"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    user(id: ID!): User\n  }\n  extend type Mutation {\n    createUser(input: CreateUserInput): CreateUserResponse!\n    login(input: LoginInput): LoginResponse!\n    verifyEmail(code: Int!): MutationResponse!\n  }\n\n  type CreateUserResponse {\n    message: String!\n    status: Boolean!\n    user: User!\n  }\n\n  type LoginResponse {\n    token: String!\n    message: String!\n    success: Boolean!\n  }\n\n  type User {\n    _id: ID!\n    email: String!\n    fullName: String!\n    username: String!\n    gender: Gender!\n    age: Int!\n    createdAt: String!\n  }\n\n  enum Gender {\n    MALE\n    FEMALE\n    BISEXUAL\n  }\n\n  input CreateUserInput {\n    email: String!\n    fullName: String!\n    username: String!\n    gender: Gender!\n    age: Int!\n    password: String!\n    confirmPassword: String!\n  }\n\n  input LoginInput {\n    email: String!\n    password: String!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server-express"),
    gql = _require.gql;

var userSchema = gql(_templateObject());
module.exports = userSchema;