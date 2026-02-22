const pool = require('../config/db');

exports.getDashboardData = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM movies
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};