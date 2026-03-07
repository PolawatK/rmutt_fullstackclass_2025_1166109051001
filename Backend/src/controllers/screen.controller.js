const pool = require('../config/db');
const screenModel = require('../models/screen.model');

exports.getScreens = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM screens");

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: "Server error" });
  }
};

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