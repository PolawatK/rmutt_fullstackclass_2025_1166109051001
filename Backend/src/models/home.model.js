const  pool  = require('../config/db');

exports.getHomeShowtimeMovieData = async (req, res) => {

  const { rows } = await pool.query(`
      SELECT DISTINCT m.*
      FROM movies m
      INNER JOIN showtimes s
      ON m.id = s.movie_id;
    `);

  return rows;
};

exports.getHomeComingSoonMovieData = async (req, res) => {

  const { rows } = await pool.query(`
      SELECT m.*
      FROM movies m
      LEFT JOIN showtimes s
      ON m.id = s.movie_id
      WHERE s.movie_id IS NULL;
    `);

  return rows;
};


exports.getHometheaterData = async (req, res) => {

  const { rows } = await pool.query(`
      SELECT DISTINCT amenities
      FROM screens
      WHERE amenities IS NOT NULL;
    `);

  return rows;
}