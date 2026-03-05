const Booking = require('../models/bookingcrud.model.js');

exports.getAllBookings = async () => {
  return await Booking.getAllBookings();
};