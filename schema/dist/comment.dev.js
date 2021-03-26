"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    comments: [Comment!]\n  }\n  extend type Mutation {\n    createComment(input: CreateComemntInput): CreateCommentResponse\n  }\n\n  type Comment {\n    _id: ID!\n    content: String\n    user: User\n    blog: Blog\n  }\n\n  type CreateCommentResponse {\n    message: String!\n    code: Int!\n    comment: Comment\n  }\n\n  input CreateComemntInput {\n    id: ID!\n    content: String!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server"),
    gql = _require.gql;

var commentSchema = gql(_templateObject());
module.exports = commentSchema;