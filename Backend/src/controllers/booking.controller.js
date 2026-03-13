const bookingModel = require('../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.sub; 

    const { showtime_id, seats, paymentMethod } = req.body;
    if (!showtime_id || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        message: 'showtime_id, total_price and seats are required'
      });
    }
    const bookingId = await bookingModel.createBooking(
      userId,
      showtime_id,
      seats,
      paymentMethod
    );
    return res.status(201).json({
      message: 'Booking created successfully',
      booking_id: bookingId 
    });

  } catch (err) {
    if (err.message === 'Showtime not found') { 
      return res.status(404).json({ message: err.message });
    }
    if (err.message === 'Some seats are already booked') {  
      return res.status(400).json({ message: err.message });
    }
    if (err.code === '23505') {                           
      return res.status(400).json({ message: 'One or more seats were just booked by someone else' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMyBookings = async (req, res) => {
  
  try{
    const userId = req.user.sub;

    const bookings = await bookingModel.getMyBookings(userId);

    res.json(bookings);

  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}