const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const userValidator = require('../validators/userValidator');
const aux = require('../utils/auxiliar.functions.js');

//  Register
router.post('/users/register', (req, res) => {
  if (userValidator.isValidNewUser(req.body)) {
    return userController.register(req, res);
  }
  aux.onError('User register', res, {status: 400, message: 'Missing params'})
});

//  Authenticate
router.post('/users/authenticate', (req, res) => {
  if (userValidator.isValidUser(req.body)) {
    return userController.authenticate(req, res);
  }
  aux.onError('User Auth', res, {status: 400, message: 'Missing params'})
});

//  Profile
router.get('/users/profile', passport.authenticate('jwt', {'session': false}), (req, res) => {
  res.status(200).json({'success': true});
});

//  Users
router.get('/users', passport.authenticate('jwt', {'session': false}), (req, res) => userController.getAll(req, res));

module.exports = router;
