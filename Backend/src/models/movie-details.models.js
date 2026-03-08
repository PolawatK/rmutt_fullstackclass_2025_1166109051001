const db = require("../config/db");

const getMovieById = async (movieId) => {
  const result = await db.query(
    `SELECT * FROM movies WHERE id = $1`,
    [movieId]
  );
  return result.rows[0];
};

const getActorsByMovie = async (movieId) => {
  const result = await db.query(
    `SELECT a.name
     FROM actors a
     JOIN movie_actors ma ON a.id = ma.actor_id
     WHERE ma.movie_id = $1`,
    [movieId]
  );
  return result.rows;
};

const getMovieRating = async (movieId) => {
  const result = await db.query(
    `SELECT AVG(rating) as rating, COUNT(*) as reviews
     FROM reviews
     WHERE movie_id = $1`,
    [movieId]
  );
  return result.rows[0];
};

const getShowtimesByMovie = async (movieId) => {
  const result = await db.query(
    `SELECT
        st.id,
        st.start_time,
        st.price,
        sc.name as screen_name,
        sc.location
     FROM showtimes st
     JOIN screens sc ON st.screen_id = sc.id
     WHERE st.movie_id = $1
     ORDER BY st.start_time`,
    [movieId]
  );

  return result.rows;
};

module.exports = {
  getMovieById,
  getActorsByMovie,
  getMovieRating,
  getShowtimesByMovie
};