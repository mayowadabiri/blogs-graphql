"use strict";

var mongoose = require("mongoose");

var ttl = require("mongoose-ttl");

var Schema = mongoose.Schema;
var tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  expireAt: {
    type: Date,
    required: true,
    "default": Date.now()
  }
}, {
  timestamps: true
});
tokenSchema.plugin(ttl, {
  ttl: "30m"
});
module.exports = mongoose.model("Token", tokenSchema);