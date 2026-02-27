const reviewModel = require('../models/review.model');

exports.getReviewData = async (req, res) => {
  try {
    const data = await reviewModel.getReviewData(req, res);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};