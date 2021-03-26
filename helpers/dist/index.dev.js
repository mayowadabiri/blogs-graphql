"use strict";

var _require = require("./bcrypt"),
    bcryptCompare = _require.bcryptCompare,
    bcryptHash = _require.bcryptHash;

var _require2 = require("./error"),
    error = _require2.error,
    handleError = _require2.handleError;

var _require3 = require("./jwt"),
    decoded = _require3.decoded,
    sign = _require3.sign,
    verifyToken = _require3.verifyToken;

var _require4 = require("./sendEmail"),
    sendMail = _require4.sendMail;

var index = {
  bcryptCompare: bcryptCompare,
  bcryptHash: bcryptHash,
  error: error,
  handleError: handleError,
  decoded: decoded,
  sign: sign,
  verifyToken: verifyToken,
  sendMail: sendMail
};
module.exports = index;