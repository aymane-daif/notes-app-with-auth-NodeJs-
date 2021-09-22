const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: [
        30,
        'Your username length must be between 1 and 30 characters',
      ],
      match: [
        /^[\w\s\-]+$/gi,
        'Your username can only contain alphanumeric characters',
      ],
      required: [true, 'Please provide a username'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
        'Please provide a valid email',
      ],
      trim: true,
      unique: [true, 'email already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Your password must be at least 6 characters long'],
    },
  },
  { timestamps: true }
);
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
