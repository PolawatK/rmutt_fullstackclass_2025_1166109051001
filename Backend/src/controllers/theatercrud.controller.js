const theatercrudmodel = require('../models/theatercrud.model');


exports.getTheaterScreen = async (req, res) => {
  try {
    const theatershowtime = await theatercrudmodel.getTheaterScreen();
    res.json(theatershowtime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};
