const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theatercrud.controller');


router.get('/', theaterController.getTheaterScreen);
router.post('/add', theaterController.addTheaterScreen);

module.exports = router;