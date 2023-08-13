const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  image: String,
  name: String,
  time: Number,
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
