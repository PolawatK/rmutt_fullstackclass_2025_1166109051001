const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtime.controller');

router.post("/", showtimeController.createShowtime);
router.get("/", showtimeController.getAllShowtimes);
router.get('/:id', showtimeController.getShowtimeById);
router.get('/:id/booked-seats', showtimeController.getBookedSeats);

router.delete('/:id', showtimeController.deleteShowtime);
router.put('/:id', showtimeController.updateShowtime);

module.exports = router;