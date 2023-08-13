const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const referralSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  commission: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
  regDate: {
    type: Number,
    default: 0,
  },
  referralUsername: {
    type: String,
    default: "",
  },
  currencySymbol: String,
  currencyName: String,
});

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
