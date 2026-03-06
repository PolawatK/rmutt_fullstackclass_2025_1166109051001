const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/movies/showing', homeController.getHomeShowtimeMovieData);
router.get('/movies/coming-soon', homeController.getHomeComingSoonMovieData);

router.get('/theater', homeController.getHometheaterData);

module.exports = router;