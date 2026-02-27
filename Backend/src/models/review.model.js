const  pool  = require('../config/db');

exports.getReviewData = async (req, res) => {

  const { rows } = await pool.query(
    `
    SELECT *
      FROM reviews
    `
  );

  return rows;
};

