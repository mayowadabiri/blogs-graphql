"use strict";

var _require = require("apollo-server"),
    ForbiddenError = _require.ForbiddenError,
    AuthenticationError = _require.AuthenticationError;

var _require2 = require("graphql-resolvers"),
    skip = _require2.skip;

exports.isAuthenticated = function (parent, args, _ref) {
  var payload = _ref.payload;
  console.log(payload, "from middleware");
  payload ? skip : new AuthenticationError("You must login to view details");
};