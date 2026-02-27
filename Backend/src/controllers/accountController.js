const accountService = require('../services/account.service');
const authService = require('../services/auth.service');

module.exports = {

  async getAccount(req, res) {
    const accounts = await accountService.getAllAccounts();
    res.json(accounts);
  },

  async getProfile(req, res) {
    const profile = await accountService.getProfile(req.user.sub);
    res.json(profile);
  },

  async register(req, res) {
    const result = await accountService.register(req.body);
    res.status(201).json(result);
  },

  async login(req, res) {
    const result = await authService.login(req.body);
    res.json(result);
  },

  async me(req, res) {
    res.json({
      user_id: req.user.sub,
      name: req.user.name,
      role_id: req.user.role_id
    });
  },

  async refreshToken(req, res) {
    const result = await authService.refreshToken(req.body.refresh_token);
    res.json(result);
  }
};