const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcrud-controller');

router.get('/', bookingController.getAll);

module.exports = router;