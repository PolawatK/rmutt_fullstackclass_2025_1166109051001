const  pool  = require('../config/db');

exports.getReviewData = async (req, res) => {

  const { rows } = await pool.query(
    `
    SELECT 
      m.title,r.comment,r.rating,u.name,r.created_at
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN movies m ON r.movie_id = m.id
    `
  );

  return rows;
};

