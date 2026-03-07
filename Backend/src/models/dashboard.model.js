const  pool  = require('../config/db');

exports.getAllMoviesData = async (req, res) => {
    const movies = await pool.query(`SELECT COUNT(id) FROM movies`);
    const bookings = await pool.query(`SELECT COUNT(id) FROM bookings`);
    const payments = await pool.query(`SELECT COUNT(id) FROM payments`);
    const customers = await pool.query(`SELECT COUNT(id) FROM users`);
    const screens = await pool.query(`SELECT COUNT(id) FROM screens`);
    const reviews = await pool.query(`SELECT COUNT(id) FROM reviews`);
    const stats = {
      totalMovies: Number(movies.rows[0].count),
      totalBookings: Number(bookings.rows[0].count),
      totalPayments: Number(payments.rows[0].count),
      totalcustomers: Number(customers.rows[0].count),
      totalscreens: Number(screens.rows[0].count),
      totalreviews: Number(reviews.rows[0].count)
    };

    return stats;
  
};