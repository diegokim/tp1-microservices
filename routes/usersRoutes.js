const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const userValidator = require('../validators/userValidator');

//  Register
router.post('/users/register', (req, res) => {
  if (userValidator.isValidNewUser(req.body)) {
    return userController.register(req, res);
  }
  res.status(400).json({ message: 'Missing params' }); // No deberiamos mandar el error a mano, despues lo hablamos
});

//  Authenticate
router.post('/users/authenticate', (req, res) => {
  if (userValidator.isValidUser(req.body)) {
    return userController.authenticate(req, res);
  }
  res.status(400).json({ message: 'Missing params' });
});

//  Profile
router.get('/users/profile', passport.authenticate('jwt', {'session': false}), (req, res) => {
  res.status(200).json({'success': true});
});

module.exports = router;
