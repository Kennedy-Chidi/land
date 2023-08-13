const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
  heading: String,
  body: String,
  status: {
    type: Boolean,
    default: false,
  },
  time: Number,
});

const Terms = mongoose.model("Terms", termsSchema);

module.exports = Terms;
