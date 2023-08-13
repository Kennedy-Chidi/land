const Signup = require("../models/signupModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createSignup = catchAsync(async (req, res, next) => {
  await Signup.create(req.body);
  next();
});

exports.getSignup = catchAsync(async (req, res, next) => {
  const signup = await Signup.find();

  res.status(200).json({
    status: "success",
    data: signup[0],
  });
});

exports.updateSignup = catchAsync(async (req, res, next) => {
  await Signup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  next();
});
