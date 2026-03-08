const Payment = require('../models/payment.model');

exports.getAllPayments = async (req, res) => {
  try {

    const payments = await Payment.getAllPayments();

    res.json(payments);

  } catch (error) {

    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });

  }
};