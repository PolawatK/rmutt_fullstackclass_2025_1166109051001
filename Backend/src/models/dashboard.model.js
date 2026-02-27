const  pool  = require('../config/db');

exports.getAllMoviesData = async (req, res) => {

  const { rows } = await pool.query(`
      SELECT *
      FROM movies
      ORDER BY created_at DESC
    `);

  return rows;
};