const UserRepository = require('../repositories/usersRepository');
const configDB = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports.register = (name, username, email, password) => {
  const newUser = new UserRepository({
    'name':     name,
    'email':    email,
    'username': username,
    'password': password
  });

  return UserRepository.validateNewUser(newUser)
		.then(() => UserRepository.addUser(newUser))
		.then(() => Promise.resolve('User registered'))
		.catch((err) => Promise.reject('Failed to register user: ' + err));
};

module.exports.authenticate = (username, password) => UserRepository.getUserByUsername(username)
  .then((userObtained) => checkPasswordIfUser(userObtained, password))
  .then((isMatch) => getTokenIf(isMatch, username))
  .then((token) => Promise.resolve(token))
  .catch((err) => Promise.reject('Authenticate error' + err));

/*  Returns a promise with the token if the isMatch boolean is true
*/
const getTokenIf = function (isMatch, username) {
  if (isMatch) {
    const token = jwt.sign({'username': username}, configDB.secret, {
      'expiresIn': 604800
    });

    return Promise.resolve(token);
  }
  return Promise.reject('There is not a match');
};

/*  Returns a promise with a boolean that tells if the passwords match
*/
const checkPasswordIfUser = function (user, password) {
  if (!user) {
    return Promise.reject('User not found');
  }

  return UserRepository.comparePassword(password, user.password);
};
