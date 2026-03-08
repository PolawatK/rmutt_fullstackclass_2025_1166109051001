const  pool  = require('../config/db');

exports.createShowtime = async(movie_id, screen_id, start_time, price) =>{

  const movie = await pool.query(
    `SELECT duration_minutes FROM movies WHERE id=$1`,
    [movie_id]
  );

  if(movie.rows.length === 0){
    throw new Error("Movie not found");
  }

  const duration = movie.rows[0].duration_minutes;

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
      throw new Error("Showtime conflict in this screen");
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
exports.getAllShowtimes = async () => {

  const { rows } = await pool.query(`
    SELECT
      st.id,
      st.start_time,
      st.price,
      m.title AS movie_title,
      m.duration_minutes,
      s.name AS screen_name
    FROM showtimes st
    JOIN movies m ON st.movie_id = m.id
    JOIN screens s ON st.screen_id = s.id
    ORDER BY st.start_time
  `);

  return rows;
};

exports.findById = async (id) => {

  const { rows } = await pool.query(
    `
    SELECT 
      st.id,
      st.screen_id,
      st.start_time,
      st.price,
      m.image_url,
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

exports.deleteShowtime = async (id) => {

  const query = `
  DELETE FROM showtimes
  WHERE id = $1
  `;

  await pool.query(query,[id]);

};

exports.updateShowtime = async (id, movie_id, screen_id, start_time, price) => {

  // ดึง duration ของ movie
  const movie = await pool.query(
    `SELECT duration_minutes FROM movies WHERE id = $1`,
    [movie_id]
  );

  if(movie.rows.length === 0){
    throw new Error("Movie not found");
  }

  const duration = movie.rows[0].duration_minutes;

  const start = new Date(start_time);
  const end = new Date(start.getTime() + duration * 60000);

  // เช็ค showtime ที่มีอยู่ใน screen เดียวกัน
  const existing = await pool.query(`
    SELECT s.start_time, m.duration_minutes
    FROM showtimes s
    JOIN movies m ON s.movie_id = m.id
    WHERE s.screen_id = $1
    AND s.id != $2
  `,[screen_id, id]);

  for(const row of existing.rows){

    const oldStart = new Date(row.start_time);
    const oldEnd = new Date(
      oldStart.getTime() + row.duration_minutes * 60000
    );

    if(start < oldEnd && end > oldStart){
      throw new Error("Showtime conflict in this screen");
    }

  }

  // update showtime
  const query = `
    UPDATE showtimes
    SET movie_id = $1,
        screen_id = $2,
        start_time = $3,
        price = $4
    WHERE id = $5
    RETURNING *
  `;

  const result = await pool.query(query,[
    movie_id,
    screen_id,
    start_time,
    price,
    id
  ]);

  return result.rows[0];

};