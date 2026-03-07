const pool = require("../config/db");

exports.createScreen = async (name, location, amenities) => {
  const { rows } = await pool.query(
    `INSERT INTO screens (name, location, amenities)
     VALUES ($1,$2,$3)
     RETURNING id`,
    [name, location, amenities],
  );

  return rows[0];
};

exports.createSeat = async (screenId, rowLabel, seatNumber, seatType) => {
  await pool.query(
    `INSERT INTO seats (screen_id, row_label, seat_number, seat_type)
     VALUES ($1,$2,$3,$4)`,
    [screenId, rowLabel, seatNumber, seatType],
  );
};

exports.updateScreen = async (id, name, location, amenities) => {
  const { rows } = await pool.query(
    `UPDATE screens
     SET name = $1,
         location = $2,
         amenities = $3
     WHERE id = $4
     RETURNING *`,
    [name, location, amenities, id],
  );

  return rows[0];
};

exports.deleteSeatsByScreen = async (screenId) => {
  await pool.query(
    `DELETE FROM seats
     WHERE screen_id = $1`,
    [screenId],
  );
};

exports.deleteScreen = async (id) => {
  await pool.query(
    `DELETE FROM screens
     WHERE id = $1`,
    [id],
  );
};

exports.checkShowtime = async (screenId) => {
  const { rows } = await pool.query(
    `SELECT EXISTS (
        SELECT 1
        FROM showtimes
        WHERE screen_id = $1
     )`,
    [screenId],
  );

  return rows[0].exists;
};

exports.getTheaterScreen = async () => {
  const { rows } = await pool.query(`
      SELECT
        s.id,
        s.name,
        s.location,
        s.amenities,

        COUNT(se.id) AS total_seats,
        COUNT(se.id) FILTER (WHERE se.seat_type = 'Normal')  AS normal_count,
        COUNT(se.id) FILTER (WHERE se.seat_type = 'Premium') AS premium_count,
        COUNT(se.id) FILTER (WHERE se.seat_type = 'VIP')     AS vip_count

        FROM screens s
        LEFT JOIN seats se ON se.screen_id = s.id

        GROUP BY s.id, s.name, s.location, s.amenities
        ORDER BY s.id;
    `);

  return rows;
};
