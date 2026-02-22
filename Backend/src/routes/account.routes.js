const express = require('express');
const accountController = require('../controllers/accountController');
const {authenticateToken, authenticateAdmin} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticateToken, accountController.me);
router.get('/admin/users', authenticateToken, authenticateAdmin, accountController.getAllUsers);
router.get('/accounts', authenticateToken, accountController.getAccount);
router.get('/profile', authenticateToken, accountController.getProfile);

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.post('/refresh', accountController.refreshToken);


module.exports = router;
