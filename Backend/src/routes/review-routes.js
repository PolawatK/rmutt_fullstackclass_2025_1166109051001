const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');


router.get('/', reviewController.getReviewData);
router.get('/movie/:movieId', reviewController.getReviewDataByMovie);
module.exports = router;    