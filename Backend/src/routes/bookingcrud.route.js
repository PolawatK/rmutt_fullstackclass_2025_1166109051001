const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcrud-controller');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken,bookingController.getAll);

module.exports = router;