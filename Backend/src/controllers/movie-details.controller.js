const movieModel = require("../models/movie-details.models");

const getMovieDetails = async (req, res) => {
  try {

    const movieId = req.params.id;

    const movie = await movieModel.getMovieById(movieId);
    const showtimes = await movieModel.getShowtimes(movieId);

    res.json({
      movie,
      showtimes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getMovieDetails };