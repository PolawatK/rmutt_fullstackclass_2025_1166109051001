const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcrud-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', authenticateToken,authenticateAdmin,bookingController.getAll);

module.exports = router;