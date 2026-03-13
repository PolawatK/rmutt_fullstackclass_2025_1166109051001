const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/',authenticateToken,authenticateAdmin, paymentController.getAllPayments);

module.exports = router;