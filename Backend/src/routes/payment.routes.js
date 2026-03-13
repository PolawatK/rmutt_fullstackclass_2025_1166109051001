const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/',authenticateToken, paymentController.getAllPayments);

module.exports = router;