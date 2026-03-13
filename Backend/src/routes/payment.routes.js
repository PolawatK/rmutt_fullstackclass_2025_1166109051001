const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.get('/',authenticateAdmin, paymentController.getAllPayments);

module.exports = router;