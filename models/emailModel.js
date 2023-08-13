const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  banner: String,
  template: String,
  title: String,
  content: String,
  headerColor: String,
  footerColor: String,
  mainColor: String,
  greeting: String,
  warning: String,
  time: Number,
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
