"use strict";

var _require = require("./pvt"),
    privateKey = _require.privateKey;

var _require2 = require("./pbk"),
    publicKey = _require2.publicKey;

var index = {
  publicKey: publicKey,
  privateKey: privateKey
};
module.exports = index;