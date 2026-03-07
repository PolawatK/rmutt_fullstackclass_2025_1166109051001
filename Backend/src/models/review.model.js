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

app.post("/reviews",(req,res)=>{

const {movieId,rating,comment} = req.body

const sql = `
INSERT INTO reviews(movie_id,rating,comment)
VALUES(?,?,?)
`

db.query(sql,[movieId,rating,comment],(err,result)=>{

res.json({message:"review saved"})

})

})

