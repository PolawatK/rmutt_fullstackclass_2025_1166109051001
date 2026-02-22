const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided'});

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token'});
        req.user = decoded;
        next();
    });
}

function authenticateAdmin(req, res, next){
    if (!req.user || req.user.role_id !== 2){
        return res.status(403).json({ error: 'Admin only access' });
    }
    next();
}

module.exports = { authenticateToken, authenticateAdmin };