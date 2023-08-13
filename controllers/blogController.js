const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.banner = req.file.filename;
  }
  const blog = await Blog.create(req.body);
  next();
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const blog = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: blog,
    resultLength: resultLen.length,
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  if (req.file) {
    req.body.banner = req.file.filename;
    const oldBlog = await Blog.findById(req.params.id);
    filesToDelete.push(oldBlog.banner);
  }
  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;
  next();
});

exports.getABlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  const oldBlog = await Blog.findById(req.params.id);
  await Blog.findByIdAndDelete(req.params.id);

  filesToDelete.push(oldBlog.banner);
  req.fileNames = filesToDelete;

  next();
});
