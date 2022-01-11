const reviewModel = require("../models/reviewModel");

/**
 * get all reviews and sort them by date published in ascending order
 * @param {*} req
 * @param {*} res
 */
const getAllReviews = async (req, res) => {
  res.json(await reviewModel.find().sort({ published: 1 }));
};

const getReviewsByUserId = async (req, res) => {
  res.json(await reviewModel.find({ owner: req.user._id }));
};

const getReviewById = async (req, res) => {
  res.json(await reviewModel.findOne({ _id: req.query.reviewId }));
};

module.exports = { getAllReviews };
