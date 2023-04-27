const ErrorHander = require("../utils/errorhander");
const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "Internal Server Error!");

  //Wrong ID entered in MongoDB Params
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid, try again.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "TokenExpiredError") {
    const message = `JSON Web Token is expired, try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
