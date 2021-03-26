"use strict";

// const { ForbiddenError } = require("apollo-server");
var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError;

var _require2 = require("graphql-resolvers"),
    combineResolvers = _require2.combineResolvers;

var _require3 = require("./authentication"),
    isAuthenticated = _require3.isAuthenticated;

var userResolver = {
  Query: {
    _: function _() {
      return regeneratorRuntime.async(function _$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", true);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    user: function user(parent, _ref, _ref2) {
      var id, models, payload, user;
      return regeneratorRuntime.async(function user$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref.id;
              models = _ref2.models, payload = _ref2.payload;

              if (payload) {
                _context2.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to view user details");

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(models.User.getUser(id));

            case 6:
              user = _context2.sent;
              return _context2.abrupt("return", user);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  User: {
    createdAt: function createdAt(parent, _, _ref3) {
      var models;
      return regeneratorRuntime.async(function createdAt$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              models = _ref3.models;
              _context3.next = 3;
              return regeneratorRuntime.awrap(new Date(parent.createdAt).toLocaleString());

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  },
  Mutation: {
    createUser: function createUser(_, _ref4, _ref5) {
      var input, models;
      return regeneratorRuntime.async(function createUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              input = _ref4.input;
              models = _ref5.models;
              _context4.next = 4;
              return regeneratorRuntime.awrap(models.User.createUser(input));

            case 4:
              return _context4.abrupt("return", _context4.sent);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    login: function login(_, _ref6, _ref7) {
      var input, models;
      return regeneratorRuntime.async(function login$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              input = _ref6.input;
              models = _ref7.models;
              console.log("reached");
              _context5.next = 5;
              return regeneratorRuntime.awrap(models.User.login(input));

            case 5:
              return _context5.abrupt("return", _context5.sent);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    verifyEmail: function verifyEmail(_, _ref8, _ref9) {
      var code, models;
      return regeneratorRuntime.async(function verifyEmail$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              code = _ref8.code;
              models = _ref9.models;
              _context6.next = 4;
              return regeneratorRuntime.awrap(models.User.verifyEmail(code));

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }
};
module.exports = userResolver;