const screenModel = require('../models/screen.model');

exports.getSeatsByScreen = async (req, res) => {
  try {
    const { id } = req.params;

    const seats = await screenModel.findSeatsByScreen(id);

    res.json(seats);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};