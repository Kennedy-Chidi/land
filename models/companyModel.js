const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  systemEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  dayStarted: {
    type: Number,
    default: 0,
  },
  onlineMembers: {
    type: Number,
    default: 0,
  },
  totalMembers: {
    type: Number,
    default: 0,
  },
  activeMembers: {
    type: Number,
    default: 0,
  },
  socials: Array,
  coloredSocials: Array,
  media: Array,
  coloredMedia: Array,
  companyName: String,
  bannerCategories: Array,
  companyDomain: String,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
