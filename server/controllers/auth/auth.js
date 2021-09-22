const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CustomError = require('../../errors/CustomError');
const User = require('../../models/User');
require('dotenv').config();

const createUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(new CustomError('Please fill out all fields'), 400);
    }
    const isAlready = await User.findOne({ email });
    if (isAlready) {
      return next(new CustomError('email already exists'), 400);
    }
    const user = {
      username,
      email,
      password,
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await User.create(user);
    const payload = {
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const logInUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError('Please fill out all fields'), 400);
    }

    const isAlready = await User.findOne({ email });
    if (!isAlready) {
      return next(new CustomError('Invalid credentials'), 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, isAlready.password);
    if (!isPasswordMatch) {
      return next(new CustomError('Invalid credentials'), 400);
    }

    const payload = {
      id: isAlready.id,
      username: isAlready.username,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, logInUser };
