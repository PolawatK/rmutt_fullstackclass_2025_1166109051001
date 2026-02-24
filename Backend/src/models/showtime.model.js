const  pool  = require('../config/db');

exports.findById = async (id) => {

  const { rows } = await pool.query(
    `
    SELECT 
      st.id,
      st.screen_id,
      st.start_time,
      st.price,
      m.title AS movie_title,
      s.name AS screen_name
    FROM showtimes st
    JOIN movies m ON st.movie_id = m.id
    JOIN screens s ON st.screen_id = s.id
    WHERE st.id = $1
    `,
    [id]
  );

  return rows[0];
};

exports.findBookedSeats = async (showtimeId) => {

  const { rows } = await pool.query(
    `
    SELECT seat_id
    FROM booking_seats
    WHERE showtime_id = $1
    `,
    [showtimeId]
  );

  return rows.map(r => r.seat_id);
};