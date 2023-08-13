const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  image: String,
  time: Number,
  content: String,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
