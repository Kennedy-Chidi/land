const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = new mongoose.Schema({
  category: String,
  title: String,
  subtitle: String,
  banner: String,
  time: Number,
  author: String,
  content: String,
  day: String,
  type: String,
  status: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
