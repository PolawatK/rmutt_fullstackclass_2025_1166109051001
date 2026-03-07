const pool = require('../config/db');
  exports.getAllPayments = async () => {
    const result = await pool.query(`
    
    SELECT
      p.id,
      u.name AS customer,
      p.method,
      p.amount,
      p.paid_at

    FROM payments p
    JOIN bookings b ON p.booking_id = b.id
    JOIN users u ON b.user_id = u.id

    ORDER BY p.paid_at DESC
    
  `);

  return result.rows;

};
