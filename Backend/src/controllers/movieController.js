const Moviemodel = require('../models/movie.model');

exports.getMovieDataCRUD = async (req, res) => {
  try {
    const movies = await Moviemodel.getMovieDataCRUD(req, res);

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};