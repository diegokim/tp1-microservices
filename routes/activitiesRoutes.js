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

//  Register into activities
router.put('/activities/:activityId/register', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.register(req, res));

//  Delete activity
router.delete('/activities/:activityId', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.delete(req, res));

//  Get activities
router.get('/activities', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.list(req, res));

//  Search activities
router.get('/activities/search', passport.authenticate('jwt', {'session': false}), (req, res) => {
  if (validator.isValidSearch(req.body)) {
    return activitiesController.search(req, res);
  }
  res.status(400).json({ message: 'Missing params' });
});

module.exports = router;
