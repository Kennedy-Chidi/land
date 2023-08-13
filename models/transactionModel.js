const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  symbol: String,
  username: String,
  amount: Number,
  autoTransact: Boolean,
  transactionType: String,
  planName: String,
  planDuration: Number,
  planPeriod: Number,
  planCycle: Number,
  percent: Number,
  walletName: String,
  referredBy: String,
  walletId: String,
  serverTime: Number,
  time: Number,
  reinvest: Boolean,
  status: {
    type: Boolean,
    default: false,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
