const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    yarnRating: {
      type: Number,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
    imgURI: {
      type: String,
      require: true,
    },
  },
  { collection: "Reviews" }
);

reviewSchema.set("versionKey", false);

module.exports = mongoose.model("Review", reviewSchema);
