const mongoose = require('mongoose')
const bcrypt   = require('bcrypt-as-promised')
const Promise  = require('promise')
const _ 			 = require('lodash');

//  User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// eslint-disable-next-line
const User = module.exports = mongoose.model('User', UserSchema)

module.exports.validateNewUser = function (user) {
  return User.getUserByUsername(user.username)
    .then(validateUserNotExists)
    .then(User.getUserByEmail(user.email))
    .then(validateUserNotExists);
}

module.exports.getUserById = function (id) {
  return User.findById(id)
}

module.exports.getUserByEmail = function (email) {
  const query = {email: email}
  return User.findOne(query)
}

module.exports.getUserByUsername = function (username) {
  const query = {username: username}
  return User.findOne(query)
}

module.exports.addUser = function (newUser) {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hash) => {
      const createdUser = _.pick(newUser, ['id', 'name', 'username', 'email', 'password']);
      newUser.password = hash;
      newUser.save();

      return createdUser;
    })
}

module.exports.comparePassword = function (candidatePassword, hash) {
  return bcrypt.compare(candidatePassword, hash)
}

const validateUserNotExists = (user) => {
  if (user) {
    return Promise.reject('User exists');
  }
  return Promise.resolve();
}
