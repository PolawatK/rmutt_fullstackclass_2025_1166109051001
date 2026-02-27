const  pool  = require('../config/db');

exports.getCustomersData = async (req, res) => {

  const { rows } = await pool.query(
    `
    SELECT u.id,u.name AS user_name,u.email,u.phone,r.name AS role,COUNT(b.id) AS bookings,COALESCE(SUM(b.total_price), 0) AS total_spent
    FROM users u
    JOIN roles r ON u.role_id = r.id
    LEFT JOIN bookings b ON b.user_id = u.id
    GROUP BY u.id,u.name,u.email,u.phone,r.name
    ORDER BY u.id;
    `
  );

  return rows;
};