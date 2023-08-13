const Referral = require("../models/referralModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getReferral = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Referral.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const referral = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: referral,
    resultLength: resultLen.length,
  });
});

exports.deleteReferral = catchAsync(async (req, res, next) => {
  const referral = await Referral.findByIdAndDelete(req.params.id);

  next();
});
