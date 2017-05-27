const mongoose = require('mongoose')
const bcrypt = require('bcrypt-as-promised')
//  const configDB = require('../config/database')
const Promise = require('promise')

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

module.exports.getUserById = function (id) {
  return User.findById(id)
}

module.exports.validateNewUser = function (user) {
  return new Promise((resolve, reject) => {
    User.getUserByUsername(user.username)
    .then((user) => {
      if (user) {
        return reject('username already in use')
      }
      return resolve()
    })
    .then(() => User.getUserByEmail(user.email))
    .then((user) => {
      if (user) {
        return reject('email already in use')
      }
      return resolve()
    })
    .catch((err) => {
      console.log('validateNewUser error:')
      console.log(err)
      reject(err)
    })
  })
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
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hash) => {
      newUser.password = hash
      newUser.save()
      return resolve()
    })
    .catch((err) => {
      console.log('Error add user:')
      reject(err)
    })
  })
}

module.exports.comparePassword = function (candidatePassword, hash) {
  return bcrypt.compare(candidatePassword, hash)
}
