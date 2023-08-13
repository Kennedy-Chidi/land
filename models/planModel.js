const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    unique: [true, "A plan with this name already exist"],
  },
  planPeriod: {
    type: String,
    default: "Daily",
  },
  planStatus: {
    type: Boolean,
    default: false,
  },
  planCycle: Number,
  planDuration: Number,
  planPercentage: Number,
  planMinimum: Number,
  planMaximum: Number,
  referralCommission: Number,
  planBanner: String,
  planDescription: String,
  planTags: Array,
  time: Number,
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
