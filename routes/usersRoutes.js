const passport = require('passport');
const express  = require('express');
const router 	 = express.Router();
const userController = require('../controllers/usersController');

//  Register
router.post('/users/register', (req, res) => {
  userController.register(req, res);
});

//  Authenticate
router.post('/users/authenticate', (req, res) => {
  userController.authenticate(req, res);
});

//  Profile
router.get('/users/profile', passport.authenticate('jwt', {'session': false}), (req, res) => {
  res.status(200).json({'success': true}); // ???
});

module.exports = router;
