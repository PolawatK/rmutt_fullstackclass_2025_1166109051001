const theatermodel = require('../models/theater.model');


exports.getshowtime = async (req, res) => {
  try {
    const theatershowtime = await theatermodel.getshowtime();
    res.json(theatershowtime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};
