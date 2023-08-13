const Partner = require("../models/partnerModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createPartner = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  await Partner.create(req.body);

  next();
});

exports.getPartner = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Partner.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const partners = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: partners,
    resultLength: resultLen.length,
  });
});

exports.updatePartner = catchAsync(async (req, res, next) => {
  await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  next();
});

exports.deletePartner = catchAsync(async (req, res, next) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);
  next();
});
