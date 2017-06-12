const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

//  Status
router.get('/ping', (req, res) => {
  statusController.ping(req, res);
});

module.exports = router;
