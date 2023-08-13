const Currency = require("../models/currencyModel");
const Wallet = require("../models/walletModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createCurrency = catchAsync(async (req, res, next) => {
  const allowedFields = req.body;
  if (req.file) {
    allowedFields.symbol = req.file.filename;
  }
  await Currency.create(allowedFields);

  next();
});

exports.getCurrencies = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Currency.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const currencies = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: currencies,
    resultLength: resultLen.length,
  });
});

exports.updateCurrency = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  if (req.file) {
    allowedFields.symbol = req.file.filename;
    const oldPlan = await Currency.findById(req.params.id);
    filesToDelete.push(oldPlan.planBanner);
  }

  await Currency.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.getACurrency = catchAsync(async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);
  const wallet = await Wallet.findOne({
    username: req.query.username,
    currencyId: req.params.id,
  });

  res.status(200).json({
    status: "success",
    data: currency,
    wallet: wallet,
  });
});

exports.toggleCurrencyStatus = catchAsync(async (req, res, next) => {
  await Currency.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteCurrency = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const currency = await Currency.findById(req.params.id);

  await Currency.findByIdAndDelete(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  filesToDelete.push(currency.symbol);

  req.fileNames = filesToDelete;

  next();
});
