const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticateAdmin, customersController.getCustomersData);

module.exports = router;    