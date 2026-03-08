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
    console.log(req.user);
    const review = req.body;

    // เอา user_id จาก token
    review.user_id = req.user.sub;

    const result = await reviewModel.createReview(review);

    res.json(result);

  } catch (err) {

    if (err.message === "You already reviewed this movie") {
      return res.status(400).json({
        message: "You already reviewed this movie"
      });
    }

    console.error(err);
    res.status(500).json({
      message: "Add review failed",
      error: err
    });
  }
};