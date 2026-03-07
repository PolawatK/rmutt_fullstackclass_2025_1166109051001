const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, bookingController.createBooking);
router.get('/my-bookings', authenticateToken, bookingController.getMyBookings)

module.exports = router;