const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/usersController');

//  Register
router.post('/register', (req, res) => {
  usersController.register(req)
  .then((response) => res.json(response))
  .catch((response) => {
    res.json(response);
  });
});

//  Authenticate
router.post('/authenticate', (req, res) => {
  UsersController.authenticate(req)
 		.then((response) => {
		  res.json(response);
  	})
  	.catch((response) => {
    	res.json(response);
  	});
});

//  Profile
router.get('/profile', passport.authenticate('jwt', {'session': false}), (req, res) => {
  res.json({'success': true});
});

module.exports = router;
