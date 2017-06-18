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

//  Update an objective
router.put('/objectives/:objetiveId', passport.authenticate('jwt', {'session': false}), (req, res) => objectivesController.update(req, res));

//  Get objectives
router.get('/objectives', passport.authenticate('jwt', {'session': false}), (req, res) => objectivesController.list(req, res));

module.exports = router;
