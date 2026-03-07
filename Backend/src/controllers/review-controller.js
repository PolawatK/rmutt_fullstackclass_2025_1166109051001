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

exports.getReviewDataByMovie = async (req, res) => {
  try {
    const data = await reviewModel.getReviewDataByMovie(req, res);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};
exports.addReview = async (req, res) => {

  try {

    const review = req.body;

    await reviewModel.createReview(review);

    res.json(review);

  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Add review failed",
      error: err
    });
  }

};