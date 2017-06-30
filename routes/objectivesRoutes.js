const express = require('express');
const passport = require('passport');
const router = express.Router();
const objectivesController = require('../controllers/objectivesController');
const validator = require('../validators/objectivesValidator');

//  Add objective
router.post('/objectives', passport.authenticate('jwt', {'session': false}), (req, res) => {
  if (validator.isValidObjective(req.body)) {
    return objectivesController.create(req, res);
  }
  res.status(400).json({ message: 'Missing params' });
});

//  Put an activity into an objective
router.put('/objectives/:objectiveId', passport.authenticate('jwt', {'session': false}), (req, res) => {
  objectivesController.addActivityToObjective(req, res)
  .catch(() => res.status(400).json({ message: 'Invalid activity' }))
});

//  Get objectives
router.get('/objectives', passport.authenticate('jwt', {'session': false}), (req, res) => objectivesController.list(req, res));

// Delete
router.delete('/objectives/:objectiveId', passport.authenticate('jwt', {'session': false}), (req, res) => objectivesController.delete(req, res))

//  Remove activity from objective
router.delete('/objectives/:objectiveId/:activityId', passport.authenticate('jwt', {'session': false}),
 (req, res) => objectivesController.removeActivityFromObjective(req, res))

module.exports = router;
