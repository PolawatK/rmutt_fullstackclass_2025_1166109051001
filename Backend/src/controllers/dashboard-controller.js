const dashboardmodel = require('../models/dashboard.model');

exports.getDashboardData = async (req, res) => {
  try {
    const movies = await dashboardmodel.getAllMoviesData();

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};
