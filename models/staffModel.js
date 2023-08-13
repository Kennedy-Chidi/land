const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  image: String,
  position: String,
  quote: String,
  time: Number,
  coloredMedia: Array,
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
