const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  await Product.create(req.body);
  next();
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const products = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: products,
    resultLength: resultLen.length,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  if (req.file) {
    req.body.image = req.file.filename;
    const oldProduct = await Product.findById(req.params.id);
    filesToDelete.push(oldProduct.image);
  }
  await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;
  next();
});

exports.getAProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  const oldProduct = await Product.findById(req.params.id);
  await Product.findByIdAndDelete(req.params.id);

  filesToDelete.push(oldProduct.image);
  req.fileNames = filesToDelete;

  next();
});
