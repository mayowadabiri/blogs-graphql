"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    blogs: [Blog!]!\n    blog(id: ID!): Blog\n  }\n\n  extend type Mutation {\n    createBlog(input: CreateBlogInput): BlogResponse\n    updateBlog(input: UpdateBlogInput): BlogResponse\n    deleteBlog(id:ID!): MutationResponse\n  }\n\n  type Blog {\n    _id: ID!\n    title: String!\n    content: String!\n    user: User!\n    comment: [Comment!]\n  }\n\n  input CreateBlogInput {\n    title: String!\n    content: String!\n  }\n\n  input UpdateBlogInput {\n    id: ID!\n    title: String\n    content: String\n  }\n\n  type BlogResponse {\n    message: String!\n    code: Int!\n    blog: Blog!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server-express"),
    gql = _require.gql;

var blogSchema = gql(_templateObject());
module.exports = blogSchema;