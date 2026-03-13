const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers-controller');
const { authenticateAdmin ,authenticateToken} = require('../middleware/authMiddleware');

router.get('/', authenticateToken, authenticateAdmin, customersController.getCustomersData);

module.exports = router;    