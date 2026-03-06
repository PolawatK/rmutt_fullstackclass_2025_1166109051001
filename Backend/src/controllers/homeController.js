const Homemodel = require('../models/home.model');

exports.getHomeShowtimeMovieData = async (req, res) => {
  try {
    const movies = await Homemodel.getHomeShowtimeMovieData(req, res);

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};

exports.getHomeComingSoonMovieData = async (req, res) => {
  try {
    const movies = await Homemodel.getHomeComingSoonMovieData(req, res);

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};

exports.getHometheaterData = async (req, res) => {
  try {
    const theaters = await Homemodel.getHometheaterData(req, res);

    res.json(theaters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};