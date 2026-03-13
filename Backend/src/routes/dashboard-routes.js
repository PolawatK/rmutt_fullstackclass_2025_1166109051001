const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
const { authenticateAdmin,authenticateToken} = require('../middleware/authMiddleware');

router.get('/',authenticateToken,authenticateAdmin, dashboardController.getDashboardData);

module.exports = router;