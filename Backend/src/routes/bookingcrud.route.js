const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcrud-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticateAdmin,bookingController.getAll);

module.exports = router;