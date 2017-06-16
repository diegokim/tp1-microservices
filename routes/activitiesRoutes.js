const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validator = require('../validators/activityValidator');

//  Add activity
router.post('/activities', (req, res) => {
  if (validator.isValidActivity(req.body)) {
    return activitiesController.create(req, res);
  }
  res.status(400).json({ message: 'Missing params' });
});

//  Get activities
router.get('/activities', (req, res) => activitiesController.list(req, res));

module.exports = router;
