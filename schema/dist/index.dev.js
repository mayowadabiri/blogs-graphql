"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    _: Boolean\n  }\n\n  type MutationResponse {\n    code: Int!\n    message: String!\n    success: Boolean!\n  }\n\n  type Mutation {\n    _: Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server-express"),
    gql = _require.gql;

var blogSchema = require("./blog");

var commentSchema = require("./comment");

var userSchema = require("./user");

var linkSchema = gql(_templateObject());
module.exports = [linkSchema, userSchema, blogSchema, commentSchema];