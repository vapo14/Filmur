const reviewModel = require("../models/reviewModel");

/**
 * get all reviews and sort them by date published in ascending order
 * @param {*} req
 * @param {*} res
 */
const getAllReviews = async (req, res) => {
  res.json(await reviewModel.find().sort({ published: -1 }));
};

/**
 * Get all reviews by a given user ID, sorted by date published
 * @param {*} req
 * @param {*} res
 */
const getReviewsByUserId = async (req, res) => {
  res.json(
    await reviewModel.find({ owner: req.user._id }).sort({ published: -1 })
  );
};

const getReviewById = async (req, res) => {
  res.json(await reviewModel.findOne({ _id: req.query.reviewId }));
};

const postReview = async (req, res) => {
  try {
    let newPost = new reviewModel({
      movieId: req.body.movieId,
      owner: req.user._id,
      ownerUsername: req.user.username,
      title: req.body.title,
      content: req.body.content,
      yarnRating: req.body.yarnRating,
      likeCount: 0,
      commentCount: 0,
      userLikes: [],
      userSaves: [],
      imgURI: req.body.imgURI,
      published: Date(),
    });

    newPost.save((err) => {
      if (err) res.status(500).send(`Error creating post, ${err}`);
      return res.status(200).json({ status: "POST_SAVED" });
    });
  } catch (error) {
    res.status(500).send(`Error creating post, ${error}`);
  }
};

module.exports = {
  getAllReviews,
  postReview,
  getReviewById,
  getReviewsByUserId,
};
