const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  await Review.create(req.body);
  next();
});

exports.getReview = catchAsync(async (req, res) => {
  const result = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const review = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: review,
    resultLength: resultLen.length,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  if (req.file) {
    req.body.image = req.file.filename;
    const oldReview = await Review.findById(req.params.id);
    filesToDelete.push(oldReview.image);
  }
  await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  req.fileNames = filesToDelete;

  next();
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("No Review found with that ID", 404));
  }

  next();
});
