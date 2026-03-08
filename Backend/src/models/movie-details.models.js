const db = require("../config/db");

const getMovieById = async (movieId) => {
  const result = await db.query(
    "SELECT * FROM movies WHERE id = $1",
    [movieId]
  );
  return result.rows[0];
};

const getShowtimes = async (movieId) => {
  const result = await db.query(
    `
    SELECT
      st.id,
      st.start_time,
      st.price,
      sc.name as screen_name,
      sc.location
    FROM showtimes st
    JOIN screens sc ON st.screen_id = sc.id
    WHERE st.movie_id = $1
    ORDER BY st.start_time
    `,
    [movieId]
  );

  return result.rows;
};

module.exports = {
  getMovieById,
  getShowtimes
};