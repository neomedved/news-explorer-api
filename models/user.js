const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const CustomError = require('../errors/custom-error');
const messages = require('../variables/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CustomError(401, messages.wrongCredentials));
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CustomError(401, messages.wrongCredentials));
          }
          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
