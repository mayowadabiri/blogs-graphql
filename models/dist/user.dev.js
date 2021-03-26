"use strict";

// @ts-nocheck
var mongoose = require("mongoose");

var Token = require("./token");

var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError,
    UserInputError = _require.UserInputError;

var crypto = require("crypto");

var _require2 = require("../helpers/index"),
    bcryptCompare = _require2.bcryptCompare,
    bcryptHash = _require2.bcryptHash,
    decoded = _require2.decoded,
    handleError = _require2.handleError,
    sendMail = _require2.sendMail,
    sign = _require2.sign,
    verifyToken = _require2.verifyToken;

var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    "enum": ["MALE", "FEMALE", "BISEXUAL"]
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    "default": false
  },
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: "Blog"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  id: false,
  timestamps: true
});
var User = mongoose.model("User", userSchema);

User.createUser = function _callee(_ref) {
  var email, fullName, username, gender, age, password, confirmPassword, regex, userByEmail, userByUsername, hashPassword, user, config, code, token, emailConfig;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = _ref.email, fullName = _ref.fullName, username = _ref.username, gender = _ref.gender, age = _ref.age, password = _ref.password, confirmPassword = _ref.confirmPassword;
          _context.prev = 1;
          regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

          if (regex.test(email)) {
            _context.next = 5;
            break;
          }

          throw new UserInputError("Invalid email address");

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          userByEmail = _context.sent;

          if (!userByEmail) {
            _context.next = 10;
            break;
          }

          throw new AuthenticationError("User already registered with the email address");

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 12:
          userByUsername = _context.sent;

          if (!userByUsername) {
            _context.next = 15;
            break;
          }

          throw new AuthenticationError("User already registered with the username");

        case 15:
          if (!(password.length < 6)) {
            _context.next = 17;
            break;
          }

          throw new UserInputError("Password must be more than 6 letters");

        case 17:
          if (!(confirmPassword !== password)) {
            _context.next = 19;
            break;
          }

          throw new UserInputError("Password Mismatch");

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(bcryptHash(password));

        case 21:
          hashPassword = _context.sent;
          user = new User({
            email: email,
            fullName: fullName,
            username: username,
            age: age,
            gender: gender,
            password: hashPassword
          });
          config = {
            to: email,
            subject: "Registration Successful",
            html: "<h1 style=\"font-size: 28px\">Successful Registration</h1>\n      <p style=\"font-size: 12px; color: grey\">Proceed to verify your email account by clicking on the link in the next mail that will forwarded to you soon</p>"
          };
          code = ("" + Math.random()).substring(2, 10);
          token = new Token({
            token: code,
            userId: user._id
          });
          emailConfig = {
            to: email,
            subject: "Email Confirmation",
            html: "<p>Your code is</p>\n      <p style=\"width: 50%; margin: auto; font-size: 30px; letter-spacing: 3px\">".concat(code, "</p>\n     ")
          };
          _context.t0 = console;
          _context.next = 30;
          return regeneratorRuntime.awrap(sendMail(config));

        case 30:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, _context.t1);

          _context.t2 = console;
          _context.next = 35;
          return regeneratorRuntime.awrap(sendMail(emailConfig));

        case 35:
          _context.t3 = _context.sent;

          _context.t2.log.call(_context.t2, _context.t3);

          _context.next = 39;
          return regeneratorRuntime.awrap(token.save());

        case 39:
          _context.next = 41;
          return regeneratorRuntime.awrap(user.save());

        case 41:
          return _context.abrupt("return", {
            message: "Created Successfully",
            status: 200,
            user: user
          });

        case 44:
          _context.prev = 44;
          _context.t4 = _context["catch"](1);
          throw new Error(_context.t4.message);

        case 47:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 44]]);
};

User.login = function _callee2(_ref2) {
  var email, password, user, doMatch, payload, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = _ref2.email, password = _ref2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          throw new Error("No user registered with email address");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcryptCompare(password, user.password));

        case 9:
          doMatch = _context2.sent;

          if (doMatch) {
            _context2.next = 12;
            break;
          }

          throw new Error("Incorrect Password");

        case 12:
          if (user.verified) {
            _context2.next = 14;
            break;
          }

          throw new Error("Pls confirm your email address sent to your email address");

        case 14:
          payload = {
            email: user.email,
            username: user.username,
            userId: user._id
          };
          _context2.next = 17;
          return regeneratorRuntime.awrap(sign(payload));

        case 17:
          token = _context2.sent;
          return _context2.abrupt("return", {
            token: token,
            message: "Logged In Successsfully",
            success: true
          });

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](1);
          handleError(_context2.t0);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

User.getUser = function _callee3(id) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(id));

        case 2:
          user = _context3.sent;
          return _context3.abrupt("return", user);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

User.verifyEmail = function _callee4(code) {
  var token, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Token.findOne({
            token: code
          }));

        case 3:
          token = _context4.sent;

          if (token) {
            _context4.next = 6;
            break;
          }

          throw new Error("Invalid token");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            _id: token.userId
          }));

        case 8:
          user = _context4.sent;

          if (!user.verified) {
            _context4.next = 11;
            break;
          }

          throw new Error("User already verified, kindly proceed to login");

        case 11:
          user.verified = true;
          _context4.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(Token.deleteOne({
            token: code
          }));

        case 16:
          return _context4.abrupt("return", {
            message: "Email verified",
            success: true,
            code: 200
          });

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0.message);

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

User.verifyToken = function _callee5(req) {
  var token, signatory, payload;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.headers.token;

          if (!token) {
            _context5.next = 23;
            break;
          }

          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(verifyToken(token));

        case 5:
          signatory = _context5.sent;

          if (!signatory) {
            _context5.next = 15;
            break;
          }

          _context5.next = 9;
          return regeneratorRuntime.awrap(decoded(token));

        case 9:
          payload = _context5.sent;

          if (!(payload.exp > Date.now())) {
            _context5.next = 12;
            break;
          }

          throw new Error("Token already expired");

        case 12:
          return _context5.abrupt("return", payload);

        case 15:
          throw new Error("Cannot Verify Token");

        case 16:
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](2);
          throw new Error(_context5.t0.message);

        case 21:
          _context5.next = 24;
          break;

        case 23:
          return _context5.abrupt("return", {
            payload: false
          });

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 18]]);
};

module.exports = User;