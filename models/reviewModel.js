const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  username: String,
  image: String,
  country: String,
  content: String,
  time: Number,
  status: {
    type: Boolean,
    default: false,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
