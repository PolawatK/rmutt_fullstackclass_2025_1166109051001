const pool = require('../config/db');

exports.getshowtime = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        s.id AS showtimes_id,
        sc.id AS screen_id,
        sc.name AS screen_name,
        sc.location,
        sc.amenities,
        m.title AS movie_title,
        s.start_time,
        s.price
        FROM showtimes s
        LEFT JOIN movies m   ON s.movie_id = m.id
        LEFT JOIN screens sc ON s.screen_id = sc.id
    ORDER BY sc.id, s.start_time;
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};