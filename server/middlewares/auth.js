const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomError = require('../errors/CustomError');

const authorize = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
      return next(new CustomError('Authentication invalid', 401));
    }
    const token = authHeaders.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = { id: decoded.user.id, username: decoded.user.username };
    next();
  } catch (error) {
    next(new CustomError('Authentication invalid', 401));
  }
};

module.exports = authorize;
