const CustomError = require('../errors/CustomError');

const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} Not found`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    err = new CustomError('Resource not found', 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    err = new CustomError('Duplicate field value entered', 400);
  }
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new CustomError(message, 400);
  }

  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error',
  });
};

module.exports = {
  notFound,
  errorHandler,
};
