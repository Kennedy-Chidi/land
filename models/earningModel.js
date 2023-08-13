const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
  symbol: String,
  depositId: String,
  username: String,
  amount: Number,
  earning: Number,
  referredBy: String,
  walletName: String,
  walletId: String,
  time: Number,
});

const Earning = mongoose.model("Earning", earningSchema);

module.exports = Earning;
