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
        COALESCE(AVG(r.rating),0) avg_rating
      from movies m
      left join reviews r 
      on m.id = r.movie_id
      group by m.id
      order by m.created_at desc;
    `);

  return rows;
};


// CREATE MOVIE
exports.createMovieCRUD = async (
  title,
  description,
  duration_minutes,
  release_date,
  director,
  image_url
) => {

  const { rows } = await pool.query(
    `
    INSERT INTO movies
    (title, description, duration_minutes, release_date, director, image_url)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [title, description, duration_minutes, release_date, director, image_url]
  );

  return rows[0];
};



// UPDATE MOVIE
exports.updateMovieCRUD = async (
  id,
  title,
  description,
  duration_minutes,
  release_date,
  director,
  image_url
) => {

  const { rows } = await pool.query(
    `
    UPDATE movies
    SET
      title = $1,
      description = $2,
      duration_minutes = $3,
      release_date = $4,
      director = $5,
      image_url = $6
    WHERE id = $7
    RETURNING *
    `,
    [title, description, duration_minutes, release_date, director, image_url, id]
  );

  return rows[0];
};

exports.getMovieById = async (id) => {

  const { rows } = await pool.query(
    `SELECT * FROM movies WHERE id = $1`,
    [id]
  );

  return rows[0];
};



// DELETE MOVIE
exports.deleteMovieCRUD = async (id) => {

  await pool.query(
    `DELETE FROM movies WHERE id = $1`,
    [id]
  );

};