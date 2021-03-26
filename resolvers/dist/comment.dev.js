"use strict";

var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError; // const { models } = require("mongoose");


var commentResolvers = {
  Query: {
    comments: function comments(_, args, _ref) {
      var models, payload;
      return regeneratorRuntime.async(function comments$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              models = _ref.models, payload = _ref.payload;

              if (payload) {
                _context.next = 3;
                break;
              }

              throw new AuthenticationError("Pls, login to view details");

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(models.Comment.getAllComments());

            case 5:
              return _context.abrupt("return", _context.sent);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  Mutation: {
    createComment: function createComment(parent, _ref2, _ref3) {
      var input, models, payload;
      return regeneratorRuntime.async(function createComment$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              input = _ref2.input;
              models = _ref3.models, payload = _ref3.payload;

              if (payload) {
                _context2.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to  comment on this blog");

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(models.Comment.createComment(input, payload));

            case 6:
              return _context2.abrupt("return", _context2.sent);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  Comment: {
    user: function user(_ref4, _, _ref5) {
      var _user, models;

      return regeneratorRuntime.async(function user$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _user = _ref4.user;
              models = _ref5.models;
              _context3.next = 4;
              return regeneratorRuntime.awrap(models.User.getUser(_user._id));

            case 4:
              return _context3.abrupt("return", _context3.sent);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    blog: function blog(_ref6, _, _ref7) {
      var _blog, models;

      return regeneratorRuntime.async(function blog$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _blog = _ref6.blog;
              models = _ref7.models;
              _context4.next = 4;
              return regeneratorRuntime.awrap(models.Blog.getBlog(_blog._id));

            case 4:
              return _context4.abrupt("return", _context4.sent);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }
};
module.exports = commentResolvers;