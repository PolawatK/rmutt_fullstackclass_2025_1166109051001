const Account = require('../models/account');

module.exports = {

  async getAllAccounts() {
    return await Account.getAccount();
  },

  async getProfile(userId) {
    const user = await Account.getById(userId);
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
  },

  async register({ name, email, password, phone }) {
    if (!name || !email || !password || !phone) {
      throw { status: 400, message: 'All fields are required' };
    }

    const user = await Account.register(name, email, password, phone);
    if (!user) {
      throw { status: 400, message: 'Email already exists' };
    }

    return {
      message: 'Registration successful',
      name: user.name
    };
  }
};