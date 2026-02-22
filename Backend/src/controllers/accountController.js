const  Account = require('../models/account');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = {
    async getAccount(req, res){
        const accounts = await Account.getAccount();
        res.json(accounts);
    },

    async getProfile(req, res){
        const user = await Account.getById(req.user.sub);
        if (!user){
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone });
    },

    async register(req, res){
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone){
            return res.status(400).json({ error : 'All fields are required' });
        }

        const user = await Account.register(name, email, password, phone);
        if (!user){
            return res.status(400).json({ error : 'Email already exists' });
        }

        res.status(201).json({ message : 'Registration successful', name: user.name });
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await Account.login(email, password);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (user.role_id !== 1) {
            return res.status(403).json({ error: 'User is not an admin' });
        }

        const accesstoken = jwt.sign({ sub: user.id, name: user.name, role_id: user.role_id }, jwtConfig.secret,{ expiresIn: jwtConfig.expiresIn });
        const refreshToken = jwt.sign({ sub: user.id}, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });
        res.json({
            access_token: accesstoken, 
            refresh_token: refreshToken, 
            token_type: 'Bearer', 
            name: user.name, role_id: user.role_id, expires_in: 3600
        });
    },

    async me(req, res){
        res.json({ user_id: req.user.sub, name: req.user.name, role_id: req.user.role_id});
    },

    async getAllUsers(req, res){
        const users = await Account.getAccount();
        res.json(users);
    },

    async refreshToken(req, res){
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    jwt.verify(refresh_token, jwtConfig.refreshSecret, async (err, decoded) => {
            if (err){
                return res.status(403).json({ error: 'Invalid refresh token' });
            }

            const user = await Account.getById(decoded.sub);
            if (!user){
                return res.status(404).json({ error: 'User not found' });
            }

            const newAccessToken = jwt.sign(
                {
                    sub: user.id,
                    name: user.name,
                    role_id: user.role_id
                },
                jwtConfig.secret,
                { expiresIn: jwtConfig.expiresIn }
            );

            res.json({
                access_token: newAccessToken,
                token_type: 'Bearer',
                expires_in: jwtConfig.expiresIn
            });
        });
    }
}