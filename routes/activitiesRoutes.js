const express = require('express');
const passport = require('passport');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validator = require('../validators/activityValidator');
const aux = require('../utils/auxiliar.functions.js')

//  Add activity
router.post('/activities', passport.authenticate('jwt', {'session': false}), (req, res) => {
  if (validator.isValidActivity(req.body)) {
    return activitiesController.create(req, res);
  }
  aux.onError('Add Activity', res, {status: 400, message: 'Missing params'})
});

//  Get activities
router.get('/activities', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.list(req, res));

//  Register into activities
router.put('/activities/:activityId/register', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.register(req, res));

//  Update an existing activity
router.put('/activities/:activityId', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.update(req, res));

//  Delete activity
router.delete('/activities/:activityId', passport.authenticate('jwt', {'session': false}), (req, res) => activitiesController.delete(req, res));

//  Search activities
router.post('/activities/search', passport.authenticate('jwt', {'session': false}), (req, res) => {
  if (validator.isValidSearch(req.body)) {
    return activitiesController.search(req, res);
  }
  aux.onError('Activities Search', res, {status: 400, message: 'Missing params'})
});

module.exports = router;
