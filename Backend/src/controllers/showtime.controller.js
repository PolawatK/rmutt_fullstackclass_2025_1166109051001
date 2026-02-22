const showtimeModel = require('../models/showtime.model');

exports.getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await showtimeModel.findById(id);

    if (!data) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookedSeats = async (req, res) => {
  try {
    const { id } = req.params;

    const seats = await showtimeModel.findBookedSeats(id);

    res.json(seats);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};