const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  symbol: String,
  username: String,
  amount: Number,
  transactionType: String,
  planName: String,
  percent: Number,
  walletName: String,
  referredBy: String,
  walletId: String,
  time: Number,
  reinvest: {
    type: Boolean,
    default: false,
  },
  image: String,
  reinvest: Boolean,
  online: Boolean,
});

const History = mongoose.model("History", historySchema);

module.exports = History;
