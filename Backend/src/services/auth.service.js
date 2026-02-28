const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = {

  async login({ email, password }) {
    if (!email || !password) {
      throw { status: 400, message: 'Email and password required' };
    }

    const user = await Account.login(email, password);
    if (!user) {
      throw { status: 400, message: 'Invalid email or password' };
    }

    if (user.role_id !== 1) {
      throw { status: 403, message: 'User is not an admin' };
    }

    return this.generateTokens(user);
  },

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw { status: 401, message: 'No refresh token provided' };
    }

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, jwtConfig.refreshSecret, async (err, decoded) => {
        if (err) {
          return reject({ status: 403, message: 'Invalid refresh token' });
        }

        const user = await Account.getById(decoded.sub);
        if (!user) {
          return reject({ status: 404, message: 'User not found' });
        }

        const accessToken = jwt.sign(
          { sub: user.id, name: user.name, role_id: user.role_id },
          jwtConfig.secret,
          { expiresIn: jwtConfig.expiresIn }
        );

        resolve({
          access_token: accessToken,
          token_type: 'Bearer',
          expires_in: jwtConfig.expiresIn
        });
      });
    });
  },

  generateTokens(user) {
    const accessToken = jwt.sign(
      { sub: user.id, name: user.name, role_id: user.role_id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      name: user.name,
      role_id: user.role_id,
      expires_in: jwtConfig.expiresIn
    };
  }
};