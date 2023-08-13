const Staff = require("../models/staffModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createStaff = catchAsync(async (req, res, next) => {
  if (req.files && req.files.image) {
    req.body.image = req.files.image[0].filename;
  }
  const savedFields = req.body;

  //  ------------SETTING MEDIA COLORED ICONS-----------
  const coloredMediaArray = [];
  let coloredMediaTextArray = [];
  if (!Array.isArray(req.body.coloredMediaText)) {
    coloredMediaTextArray.push(req.body.coloredMediaText);
  } else {
    coloredMediaTextArray = req.body.coloredMediaText;
  }
  if (req.files.coloredMediaIcon) {
    for (let i = 0; i < req.files.coloredMediaIcon.length; i++) {
      const mediaObj = {
        icon: "",
        text: "",
      };

      mediaObj.icon = req.files.coloredMediaIcon[i].filename;
      mediaObj.text = coloredMediaTextArray[i];

      coloredMediaArray.push(mediaObj);
    }
  }
  savedFields.coloredMedia = coloredMediaArray;
  //  --------------------------------------------------

  await Staff.create(savedFields);
  next();
});

exports.getStaffs = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Staff.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const staffs = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: staffs,
    resultLength: resultLen.length,
  });
});

exports.updateStaff = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  if (req.file) {
    req.body.image = req.file.filename;
    const oldStaff = await Staff.findById(req.params.id);
    filesToDelete.push(oldStaff.image);
  }
  await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;
  next();
});

exports.getAStaff = catchAsync(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: staff,
  });
});

exports.deleteStaff = catchAsync(async (req, res, next) => {
  const filesToDelete = [];
  const oldStaff = await Staff.findById(req.params.id);
  await Staff.findByIdAndDelete(req.params.id);

  filesToDelete.push(oldStaff.image);
  req.fileNames = filesToDelete;

  next();
});
