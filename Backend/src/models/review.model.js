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


exports.getReviewDataByMovie = async (req, res) => {

  const { rows } = await pool.query(
    `
    SELECT 
      m.title,r.comment,r.rating,u.name,r.created_at
      FROM movies m
      JOIN reviews r ON r.movie_id = m.id
      JOIN users u ON r.user_id = u.id
      WHERE m.id = $1
    `,[req.params.movieId]
  );

  return rows;
};
exports.createReview = async (review) => {

  const check = await pool.query(
    `SELECT * FROM reviews 
     WHERE user_id = $1 AND movie_id = $2`,
    [review.user_id, review.movie_id]
  );

  if (check.rows.length > 0) {
    throw new Error("You already reviewed this movie");
  }

  const result = await pool.query(
    `INSERT INTO reviews 
     ( movie_id, user_id, rating, comment, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      review.movie_id,      
      review.user_id,
      review.rating,
      review.comment,
      review.created_at
    ]
  );

  return result.rows[0];
};
