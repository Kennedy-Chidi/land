const Terms = require("../models/termsModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createTerms = catchAsync(async (req, res, next) => {
  await Terms.create(req.body);
  next();
});

exports.getTerms = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Terms.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const terms = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: terms,
    resultLength: resultLen.length,
  });
});

exports.updateTerms = catchAsync(async (req, res, next) => {
  await Terms.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  next();
});

exports.deleteTerms = catchAsync(async (req, res, next) => {
  const terms = await Terms.findByIdAndDelete(req.params.id);

  if (!terms) {
    return next(new AppError("No terms found with that ID", 404));
  }

  next();
});
