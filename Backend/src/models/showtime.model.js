const  pool  = require('../config/db');

exports.createShowtime = async(movie_id, screen_id, start_time, price) =>{
  
  const movie = await pool.query(
    `SELECT duration_minute FROM movies WHERE id=$1`,[movie_id]
  );

  const duration = movie.row[0].duration_minutes;

  const start = new Date(start_time);

  const end = new Date(start.getTime() + duration * 60000);

  const existing = await pool.query(`
      SELECT s.start_time, m.duration_minutes
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.id
      WHERE s.screen_id =$1
    `,[screen_id]);

  for(const row of existing.rows){
    const oldStart = new Date(row.start_time);

    const oldEnd = new Date(
      oldStart.getTime() + row.duration_minutes * 60000
    );

    if(start < oldEnd && end > oldStart){
      throw new Error("showtime conflict in this screen");
    }

  }

  const result = await pool.query(`
      INSERT INTO showtimes
      (movie_id, screen_id, start_time, price)
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `, [movie_id, screen_id, start_time, price]);

    return result.rows[0];
};

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