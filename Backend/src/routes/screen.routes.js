const express = require('express');
const router = express.Router();
const screenController = require('../controllers/screen.controller');

router.get('/:id/seats', screenController.getSeatsByScreen);

module.exports = router;