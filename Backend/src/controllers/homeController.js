const Homemodel = require('../models/home.model');

exports.getHomeMovieData = async (req, res) => {
  try {
    const movies = await Homemodel.getHomeMovieData(req, res);

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