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