"use strict";

exports.error = function (error) {
  // console.log(error);
  return {
    // ...error,
    message: error.message,
    code: 400,
    status: "Failure"
  };
};

exports.handleError = function (err) {
  if (err.name === "Error") {
    throw new Error(err.message);
  }

  throw new Error("Request processing error!");
};