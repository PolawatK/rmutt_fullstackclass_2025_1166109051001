const  pool  = require('../config/db');

exports.getScreens = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM screens");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findSeatsByScreen = async (screenId) => {

  const { rows } = await pool.query(
    `
    SELECT id, row_label, seat_number, seat_type
    FROM seats
    WHERE screen_id = $1
    ORDER BY row_label, seat_number
    `,
    [screenId]
  );

  return rows;
};