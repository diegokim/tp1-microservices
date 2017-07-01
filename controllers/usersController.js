const _ = require('lodash');
const userService = require('../services/usersService');
const aux = require('../utils/auxiliar.functions.js')

module.exports.register = (req, res) => {
  const user = _.pick(req.body, ['name', 'username', 'email', 'password', 'nacimiento'])

  return userService.register(user)
	  .then((createdUser) => res.status(201).json(createdUser))
  	.catch((err) => aux.onError('Auth register', res, err));
};

module.exports.authenticate = (req, res) => {
  const user = _.pick(req.body, ['username', 'password'])

  return userService.authenticate(user)
		.then((token) => res.status(200).json(token))
		.catch((err) => aux.onError('Auth authenticate', res, err));
};

module.exports.getAll = (req, res) => Promise.resolve()
  .then(() => userService.getAll())
  .then((users) => res.status(200).json(users))
  .catch((err) => aux.onError('Get all users', res, err));
