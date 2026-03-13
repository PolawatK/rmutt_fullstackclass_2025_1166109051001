const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.get('/',authenticateAdmin, dashboardController.getDashboardData);

module.exports = router;