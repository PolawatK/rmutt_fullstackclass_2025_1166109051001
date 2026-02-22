const pool = require('../config/db');

exports.getReviewData = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM reviews
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};