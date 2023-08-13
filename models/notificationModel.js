const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  username: String,
  message: String,
  subject: String,
  time: Number,
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
