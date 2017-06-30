const UserRepository = require('../repositories/usersRepository');
const configDB = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports.register = ({ name, username, email, password, nacimiento }) => {
  const newUser = new UserRepository({	// NEW ?
    name,
    email,
    username,
    password,
    nacimiento
  });

  return UserRepository.validateNewUser(newUser)
		.then(() => UserRepository.addUser(newUser))
    .then((createdUser) => (Object.assign({}, createdUser, getToken(createdUser.username))))
  	.catch((err) => Promise.reject({ status: 409, message: err }));
};

module.exports.authenticate = ({ username, password }) => Promise.resolve()
	.then(() 						 => UserRepository.getUserByUsername(username))
  .then((userObtained) => checkPassword(userObtained, password))
  .then(() 		         => getToken(username))
;

/**
 * Returns a promise with the token if the isMatch boolean is true
 *
 */
const getToken = (username) => {
  const token = 'JWT ' + jwt.sign({ username }, configDB.secret, { 'expiresIn': 60480 * 100000 });
  return { token };
};

/**
 * Returns a promise with a boolean that tells if the passwords match
 *
 */
const checkPassword = (user, password) => {
  if (user) { // refactorizar
    return UserRepository.comparePassword(password, user.password)
    .then((isEqual) => {
      if (isEqual) {
        return Promise.resolve();
      }
      return Promise.reject({ status: 401, message: 'Authenticate error: invalid password' });
    })
    .catch(() => Promise.reject({ status: 401, message: 'Authenticate error: invalid password' }))
  } else {
    return Promise.reject({ status: 404, message: 'User not found' });
  }
};
