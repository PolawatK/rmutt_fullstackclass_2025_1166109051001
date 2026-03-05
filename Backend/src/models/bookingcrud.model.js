const pool = require('../config/db');

exports.getAllBookings = async () => {
  const { rows } = await pool.query(`
    SELECT 
      b.id,
      u.name AS customer,
      m.title AS movie,
      s.start_time,
      b.total_price,
      b.status,
      b.created_at,
      COUNT(bs.seat_id) AS total_seats
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN showtimes s ON b.showtime_id = s.id
      JOIN movies m ON s.movie_id = m.id
      LEFT JOIN booking_seats bs ON b.id = bs.booking_id
      GROUP BY b.id, u.name, m.title, s.start_time
      ORDER BY b.created_at DESC
  `);

  return rows;
};