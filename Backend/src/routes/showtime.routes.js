const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtime.controller');

router.get('/:id', showtimeController.getShowtimeById);
router.get('/:id/booked-seats', showtimeController.getBookedSeats);

module.exports = router;