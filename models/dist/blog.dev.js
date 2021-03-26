"use strict";

// @ts-nocheck
var mongoose = require("mongoose");

var User = require("./user");

var _require = require("../helpers/index"),
    handleError = _require.handleError;

var _require2 = require("apollo-server"),
    AuthenticationError = _require2.AuthenticationError,
    ForbiddenError = _require2.ForbiddenError;

var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Comment"
  }]
}, {
  timestamps: true
});
var Blog = mongoose.model("blog", blogSchema);

Blog.getBlogs = function _callee() {
  var blogs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Blog.find().populate("user", ["username", "fullName"]));

        case 3:
          blogs = _context.sent;
          return _context.abrupt("return", blogs);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          handleError(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

Blog.getBlog = function _callee2(id) {
  var blog;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Blog.findById(id).populate("user", ["username"]));

        case 3:
          blog = _context2.sent;

          if (blog) {
            _context2.next = 6;
            break;
          }

          throw new Error("No Blog Found");

        case 6:
          return _context2.abrupt("return", blog);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          handleError(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

Blog.createBlog = function _callee3(_ref, _ref2) {
  var title, content, userId, blog, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          title = _ref.title, content = _ref.content;
          userId = _ref2.userId;
          _context3.prev = 2;
          blog = new Blog({
            title: title,
            content: content,
            user: userId
          });
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 6:
          user = _context3.sent;

          if (user) {
            _context3.next = 9;
            break;
          }

          throw new Error("No user found");

        case 9:
          user.blogs.push(blog._id);
          _context3.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(blog.save());

        case 14:
          return _context3.abrupt("return", {
            message: "Created Successfully",
            code: 200,
            blog: blog
          });

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](2);
          throw new Error(_context3.t0.message);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 17]]);
};

Blog.updateBlog = function _callee4(_ref3, _ref4) {
  var title, content, id, userId, blog;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          title = _ref3.title, content = _ref3.content, id = _ref3.id;
          userId = _ref4.userId;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Blog.findById(id));

        case 5:
          blog = _context4.sent;

          if (blog) {
            _context4.next = 8;
            break;
          }

          throw new Error("No Blog Found");

        case 8:
          if (!(blog.user._id.toString() !== userId)) {
            _context4.next = 10;
            break;
          }

          throw new ForbiddenError("You're not allowed to update this Blog");

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Blog.findByIdAndUpdate(id, {
            title: title,
            content: content
          }, {
            "new": true,
            useFindAndModify: false
          }));

        case 12:
          blog = _context4.sent;
          return _context4.abrupt("return", {
            message: "Updated Successfully",
            code: 200,
            blog: blog
          });

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](2);
          handleError(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 16]]);
};

Blog.deleteBlog = function _callee5(id, _ref5) {
  var userId, blog, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = _ref5.userId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Blog.findById(id));

        case 4:
          blog = _context5.sent;

          if (blog) {
            _context5.next = 7;
            break;
          }

          throw new Error("No Blog Found");

        case 7:
          if (!(blog.user._id.toString() !== userId)) {
            _context5.next = 9;
            break;
          }

          throw new Error("You're not allowed to delete this blog");

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(Blog.findByIdAndDelete(id));

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 13:
          user = _context5.sent;
          _context5.next = 16;
          return regeneratorRuntime.awrap(user.blog.pull(id));

        case 16:
          _context5.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          return _context5.abrupt("return", {
            message: "Deleted Successfully",
            code: 200
          });

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](1);
          handleError(_context5.t0);

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

module.exports = Blog;