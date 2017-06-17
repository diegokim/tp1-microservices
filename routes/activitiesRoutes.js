const express = require('express');
const passport = require('passport');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validator = require('../validators/activityValidator');

//  Add activity
router.post('/activities', passport.authenticate('jwt', {'session': false}), (req, res) => {
  if (validator.isValidActivity(req.body)) {
    return activitiesController.create(req, res);
  }
  res.status(400).json({ message: 'Missing params' });
});

//  Get activities
router.get('/activities', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.list(req, res));

//  Update an existing activity
router.put('/activities/:activityId', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.update(req, res));

module.exports = router;
