const  pool  = require('../config/db');

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