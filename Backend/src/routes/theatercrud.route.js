const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theatercrud.controller');


router.get('/', theaterController.getTheaterScreen);

module.exports = router;