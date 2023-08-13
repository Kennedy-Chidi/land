const Event = require("../models/eventModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createEvent = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.banner = req.file.filename;
  }
  await Event.create(req.body);
  next();
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const events = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: events,
    resultLength: resultLen.length,
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  if (req.file) {
    req.body.image = req.file.filename;
    const oldEvent = await Event.findById(req.params.id);
    filesToDelete.push(oldEvent.image);
  }
  await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;
  next();
});

exports.getAEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  const oldEvent = await Event.findById(req.params.id);
  await Event.findByIdAndDelete(req.params.id);

  filesToDelete.push(oldEvent.image);
  req.fileNames = filesToDelete;

  next();
});
