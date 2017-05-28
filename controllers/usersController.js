const _ 				  = require('lodash');
const userService = require('../services/usersService');

module.exports.register = (req, res) => {
  const user = _.pick(req.body, ['name', 'username', 'email', 'password'])

  return userService.register(user)
	  .then((createdUser) => res.status(201).json(createdUser))
  	.catch((err) => res.status(err.status).json(err.message));
};

module.exports.authenticate = (req, res) => {
  const user = _.pick(req.body, ['username', 'password'])

  return userService.authenticate(user)
		.then((token) => res.status(200).json(token))
		.catch((err) => res.status(err.status).json(err.message));
};
