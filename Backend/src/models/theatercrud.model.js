const pool = require("../config/db");

exports.getTheaterScreen = async (req, res) => {
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
