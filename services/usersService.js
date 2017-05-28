const UserRepository = require('../repositories/usersRepository');
const configDB 			 = require('../config/database');
const jwt 					 = require('jsonwebtoken');

module.exports.register = ({ name, username, email, password }) => {
  const newUser = new UserRepository({	// NEW ?
    name,
    email,
    username,
    password
  });

  return UserRepository.validateNewUser(newUser)
		.then(() 		 => UserRepository.addUser(newUser))
		.catch((err) => Promise.reject({ status: 409, message: 'Failed to register user: ' + err }));
		// AHORA MANDAMOS 409, PERO TENEMOS QUE IDENTIFICAR EL TIPO DE ERRO QUE OCURRIO CON LA BASE DE DATOS:
		// https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
};

module.exports.authenticate = ({ username, password }) => Promise.resolve()
	.then(() 						 => UserRepository.getUserByUsername(username))
  .then((userObtained) => checkPasswordIfUser(userObtained, password))
  .then((isMatch) 		 => getTokenIf(isMatch, username)) // PORAY ESTAS DOS COSAS LAS DEBERIA HACER LA DB
;

/**
 * Returns a promise with the token if the isMatch boolean is true
 *
 */
const getTokenIf = (isMatch, username) => {
  if (isMatch) {
    const token = jwt.sign({'username': username}, configDB.secret, { 'expiresIn': 60480 });
    return Promise.resolve({ token });
  }

  return Promise.reject({ status: 401, message: 'Authenticate error: there is not match' });
};

/**
 * Returns a promise with a boolean that tells if the passwords match
 *
 */
const checkPasswordIfUser = (user, password) => {
  if (!user) {
    return Promise.reject({ status: 404, message: 'User not found' });
  }

  return Promise.resolve(UserRepository.comparePassword(password, user.password));
};
