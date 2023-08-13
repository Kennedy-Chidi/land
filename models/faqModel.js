const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  status: {
    type: Boolean,
    default: false,
  },
  time: Number,
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
