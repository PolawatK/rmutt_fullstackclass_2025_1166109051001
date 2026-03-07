const  pool  = require('../config/db');

const createBooking = async (userId, showtimeId, seats, paymentMethod) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const showtimeResult = await client.query(
      `SELECT price FROM showtimes WHERE id = $1`,
      [showtimeId]
    );
    if (showtimeResult.rows.length === 0) {
      throw new Error('Showtime not found');
    }
    const price = showtimeResult.rows[0].price;
    const totalPrice = price * seats.length;
    const existingSeats = await client.query(
      `
      SELECT seat_id
      FROM booking_seats
      WHERE showtime_id = $1
      AND seat_id = ANY($2)
      `,
      [showtimeId, seats]
    );

    if (existingSeats.rows.length > 0) {
      throw new Error('Some seats are already booked');
    }
    const bookingResult = await client.query(
      `
      INSERT INTO bookings (user_id, showtime_id, total_price, status, created_at)
      VALUES ($1, $2, $3, 'CONFIRMED', NOW())
      RETURNING id
      `,
      [userId, showtimeId, totalPrice]
    );

    const bookingId = bookingResult.rows[0].id;
    for (const seatId of seats) {
      await client.query(
        `
        INSERT INTO booking_seats (booking_id, seat_id, showtime_id)
        VALUES ($1, $2, $3)
        `,
        [bookingId, seatId, showtimeId]
      );
    }
      await client.query(
        `
        INSERT INTO payments (booking_id, amount, method,paid_at)
        VALUES ($1,$2,$3, NOW())
        `,[bookingId,totalPrice,paymentMethod])

    await client.query('COMMIT');
    return bookingId;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getMyBookings = async (userId) => {
  const result = await pool.query(`
    SELECT
      b.id AS booking_id,
      m.title,
      m.image_url,
      m.duration_minutes,
      s.start_time,
      s.screen_id,
      b.total_price,
      b.status,
      b.created_at,
      p.method AS payment_method,
        COALESCE(STRING_AGG(bs.seat_id::text, ', '),'') AS seats
    FROM bookings b
    JOIN showtimes s ON b.showtime_id = s.id
    JOIN movies m on s.movie_id = m.id
    
    LEFT JOIN booking_seats bs ON bs.booking_id = b.id
    LEFT JOIN seats se ON se.id = bs.seat_id

    LEFT JOIN payments p ON p.booking_id = b.id
    
    WHERE b.user_id = $1
    GROUP BY
      b.id,
      m.title,
      m.image_url,
      m.duration_minutes,
      s.start_time,
      s.screen_id,
      b.total_price,
      b.status,
      b.created_at,
      p.method
      ORDER BY b.created_at DESC 
    `,[userId]);

    return result.rows;
}; 

module.exports = {
  createBooking,
  getMyBookings
};