const Email = require("../models/emailModel");
const Company = require("../models/companyModel");
const SendEmail = require("../utils/email");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createEmail = catchAsync(async (req, res, next) => {
  const { doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10 } =
    req.body;

  await Email.create([
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
  ]);

  next();
});

exports.getEmails = catchAsync(async (req, res) => {
  const result = new APIFeatures(Email.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const email = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: email,
    resultLength: resultLen.length,
  });
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  if (req.file) {
    allowedFields.banner = req.file.filename;
    const oldEmail = await Email.findById(req.params.id);
    filesToDelete.push(oldEmail.banner);
  }

  await Email.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { users, email } = req.body;

  const companyResult = await Company.find();
  const company = companyResult[0];
  const domainName = company.companyDomain;
  const companyName = company.companyName;
  const resetURL = "";

  const from = `${company.systemEmail}`;
  const content = email.content.replace(
    "{{company-name}}",
    company.companyName
  );
  const warning = email.warning.replace(
    "{{company-name}}",
    company.companyName
  );

  users.forEach((user) => {
    try {
      const banner = `${domainName}/uploads/${email.banner}`;
      new SendEmail(
        companyName,
        domainName,
        from,
        user,
        email.template,
        email.title,
        banner,
        content,
        email.headerColor,
        email.footerColor,
        email.mainColor,
        email.greeting,
        warning,
        resetURL
      ).sendEmail();
    } catch (err) {
      return next(
        new AppError(
          `There was an error sending the email. Try again later!, ${err}`,
          500
        )
      );
    }
  });

  res.status(200).json({
    status: "success",
  });
});
