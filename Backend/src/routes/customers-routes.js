const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers-controller');


router.get('/', customersController.getCustomersData);

module.exports = router;    