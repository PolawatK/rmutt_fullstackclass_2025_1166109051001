const CustomersModel = require('../models/customers.model');

exports.getCustomersData = async (req, res) => {
  try {
    const data = await CustomersModel.getCustomersData(req, res);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};