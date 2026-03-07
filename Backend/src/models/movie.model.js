const  pool  = require('../config/db');

exports.getMovieDataCRUD = async (req, res) => {

  const { rows } = await pool.query(`
    select 
        m.id,
        m.title,
        m.description,
        m.duration_minutes,
        m.release_date,
        m.director,
        m.created_at,
        m.image_url,
        AVG(rating) avg_rating  
    from movies m
    join reviews r on m.id = r.movie_id
    GROUP BY m.id;
    `);

  return rows;
};