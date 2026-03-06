const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/movies', homeController.getHomeMovieData);

router.get('/theater', homeController.getHometheaterData);

module.exports = router;