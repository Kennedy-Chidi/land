const mongoose = require("mongoose");

const activeSchema = new mongoose.Schema({
  symbol: String,
  username: String,
  amount: Number,
  earning: Number,
  planName: String,
  planDuration: Number,
  planPeriod: Number,
  percent: Number,
  planCycle: Number,
  daysRemaining: Number,
  referredBy: String,
  serverTime: Number,
  walletName: String,
  walletId: String,
  time: Number,
  status: {
    type: Boolean,
    default: false,
  },
});

const Active = mongoose.model("Active", activeSchema);

module.exports = Active;
