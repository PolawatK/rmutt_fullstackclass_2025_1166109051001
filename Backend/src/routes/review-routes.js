const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', reviewController.getReviewData);
router.get('/movie/:movieId', reviewController.getReviewDataByMovie);
router.post("/", authenticateToken, reviewController.addReview);
module.exports = router;    