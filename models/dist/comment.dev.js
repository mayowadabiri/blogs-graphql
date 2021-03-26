"use strict";

// @ts-nocheck
var mongoose = require("mongoose");

var User = require("./user");

var _require = require("../helpers/index"),
    handleError = _require.handleError;

var Blog = require("./blog");

var Schema = mongoose.Schema;
var commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
commentSchema.post("save", function _callee(result) {
  var commentId, blog;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          commentId = result._id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Blog.findById(result.blog));

        case 3:
          blog = _context.sent;
          blog.comments.push(commentId);
          _context.next = 7;
          return regeneratorRuntime.awrap(blog.save());

        case 7:
          return _context.abrupt("return", blog);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
commentSchema.post("save", function _callee2(result) {
  var commentId, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          commentId = result._id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(result.user));

        case 3:
          user = _context2.sent;
          user.comments.push(commentId);
          _context2.next = 7;
          return regeneratorRuntime.awrap(user.save());

        case 7:
          return _context2.abrupt("return", user);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var Comment = mongoose.model("Comment", commentSchema);

Comment.createComment = function _callee3(_ref, _ref2) {
  var content, id, userId, blog, comment;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          content = _ref.content, id = _ref.id;
          userId = _ref2.userId;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Blog.findById(id));

        case 5:
          blog = _context3.sent;

          if (blog) {
            _context3.next = 8;
            break;
          }

          throw new Error("No Blog Found");

        case 8:
          comment = new Comment({
            content: content,
            blog: id,
            user: userId
          });
          _context3.next = 11;
          return regeneratorRuntime.awrap(comment.save());

        case 11:
          return _context3.abrupt("return", {
            message: "Created Successfully",
            code: 200,
            comment: comment
          });

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          handleError(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

Comment.getAllComments = function _callee4() {
  var comments;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Comment.find().lean());

        case 3:
          comments = _context4.sent;
          return _context4.abrupt("return", comments);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

Comment.getCommentByBlog = function _callee5(blogId) {
  var comments;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            blog: blogId
          }).lean());

        case 3:
          comments = _context5.sent;
          console.log(comments);
          return _context5.abrupt("return", comments);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = Comment;