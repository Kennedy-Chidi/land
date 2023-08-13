const Plan = require("../models/planModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createPlan = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.planBanner = req.file.filename;
  }

  const plan = await Plan.create(req.body);

  next();
});

exports.getPlans = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Plan.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const plans = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: plans,
    resultLength: resultLen.length,
  });
});

exports.updatePlan = catchAsync(async (req, res, next) => {
  let filesToDelete = [];

  if (req.file) {
    req.body.planBanner = req.file.filename;
    const oldPlan = await Plan.findById(req.params.id);
    filesToDelete.push(oldPlan.planBanner);
  }

  await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.getAPlan = catchAsync(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: plan,
  });
});

exports.togglePlanStatus = catchAsync(async (req, res, next) => {
  await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  next();
});

exports.deletePlan = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const plan = await Plan.findById(req.params.id);

  await Plan.findByIdAndDelete(req.params.id);

  if (!plan) {
    return next(new AppError("No plan found with that ID", 404));
  }

  filesToDelete.push(plan.planBanner);

  req.fileNames = filesToDelete;

  next();
});
