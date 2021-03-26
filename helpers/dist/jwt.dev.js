"use strict";

// @ts-nocheck
var jwt = require("jsonwebtoken");

var _require = require("../constant/index"),
    privateKey = _require.privateKey,
    publicKey = _require.publicKey;

var config = {
  privateKey: privateKey,
  publicKey: publicKey,
  options: {
    expiresIn: "1hr",
    algorithm: "RS256"
  }
};

exports.sign = function _callee(payload) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(jwt.sign(payload, config.privateKey, config.options));

        case 3:
          token = _context.sent;
          return _context.abrupt("return", token);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.verifyToken = function _callee2(token) {
  var signatory;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(jwt.verify(token, config.publicKey, config.options.algorithm));

        case 3:
          signatory = _context2.sent;
          return _context2.abrupt("return", signatory);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error("Error verifying token");

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.decoded = function (token) {
  return jwt.decode(token, {
    complete: true
  });
};