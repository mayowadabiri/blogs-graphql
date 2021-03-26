"use strict";

// @ts-nocheck
var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError;

var _require2 = require("graphql-resolvers"),
    combineResolvers = _require2.combineResolvers;

var _require3 = require("./authentication"),
    isAuthenticated = _require3.isAuthenticated;

var blogResolvers = {
  Query: {
    blogs: function blogs(_, args, _ref) {
      var models, payload, errorName;
      return regeneratorRuntime.async(function blogs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              models = _ref.models, payload = _ref.payload, errorName = _ref.errorName;

              if (payload) {
                _context.next = 3;
                break;
              }

              throw new AuthenticationError("Pls, login to view details");

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(models.Blog.getBlogs());

            case 5:
              return _context.abrupt("return", _context.sent);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    blog: function blog(_, _ref2, _ref3) {
      var id, models, payload;
      return regeneratorRuntime.async(function blog$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref2.id;
              models = _ref3.models, payload = _ref3.payload;

              if (payload) {
                _context2.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to view details");

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(models.Blog.getBlog(id));

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
  Blog: {
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
    comment: function comment(_ref6, _, _ref7) {
      var _id, models;

      return regeneratorRuntime.async(function comment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _id = _ref6._id;
              models = _ref7.models;
              _context4.next = 4;
              return regeneratorRuntime.awrap(models.Comment.getCommentByBlog(_id));

            case 4:
              return _context4.abrupt("return", _context4.sent);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  },
  Mutation: {
    createBlog: function createBlog(_, _ref8, _ref9) {
      var input, models, payload;
      return regeneratorRuntime.async(function createBlog$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              input = _ref8.input;
              models = _ref9.models, payload = _ref9.payload;

              if (payload) {
                _context5.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to create blog");

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(models.Blog.createBlog(input, payload));

            case 6:
              return _context5.abrupt("return", _context5.sent);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    updateBlog: combineResolvers(isAuthenticated, function _callee(_, _ref10, _ref11) {
      var input, models, payload;
      return regeneratorRuntime.async(function _callee$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              input = _ref10.input;
              models = _ref11.models, payload = _ref11.payload;

              if (payload) {
                _context6.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to view user details");

            case 4:
              _context6.next = 6;
              return regeneratorRuntime.awrap(models.Blog.updateBlog(input, payload));

            case 6:
              return _context6.abrupt("return", _context6.sent);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    }),
    deleteBlog: function deleteBlog(_, _ref12, _ref13) {
      var id, models, payload;
      return regeneratorRuntime.async(function deleteBlog$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = _ref12.id;
              models = _ref13.models, payload = _ref13.payload;

              if (payload) {
                _context7.next = 4;
                break;
              }

              throw new AuthenticationError("Pls, login to view user details");

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(models.Blog.deleteBlog(id, payload));

            case 6:
              return _context7.abrupt("return", _context7.sent);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }
};
module.exports = blogResolvers;