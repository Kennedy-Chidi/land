const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: String,
  title: String,
  subtitle: String,
  image: String,
  time: Number,
  content: String,
  price: Number,
  status: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
