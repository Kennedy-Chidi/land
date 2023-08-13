const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getNotifications = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Notification.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const notifications = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: notifications,
    length: resultLen.length,
  });
});

exports.createNotification = async (
  username,
  transactionType,
  date,
  dateCreated,
  receiver
) => {
  const withdrawalNotice = `Hello ${username}, you have made withdrawal transaction,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const withdrawalApproval = `Hello ${username}, your last withdrawal transaction has been approved,
  and the receipient account credited, thanks for choosing AS Finance.`;

  const depositNotice = `Hello ${username}, you have made deposit transaction,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const depositApproval = `Hello ${username}, your last deposit transaction has been approved and your account credited,
  thanks for choosing AS Finance.`;

  const transferNotice = `Hello ${username}, you have made a transfer to a Zivik user,
  the transaction will be processed automatically with a maximum processing time of 24 hours and you will be notified once the transaction is confirmed.
  Please contact us for any issue.`;

  const internalApproval = `Hello ${username}, your last transfer transaction to a Zivik user,
  has been approved and the receipient credited, thanks for choosing AS Finance.`;

  const creditApproval = `Hello ${username}, your account has been credited by ${receiver} a AS Finance user,
  check your email and dashboard for confirmation, thanks for choosing AS Finance.`;

  let title = "";

  const getTransctionMsg = () => {
    if (transactionType == "withdrawal") {
      title = "Withdrawal Notification";
      return withdrawalNotice;
    } else if (transactionType == "deposit") {
      title = "Deposit Notification";
      return depositNotice;
    } else if (transactionType == "deposit-approval") {
      title = "Deposit Approval Notification";
      return depositApproval;
    } else if (transactionType == "internal") {
      title = "Internal Transfer Notification";
      return transferNotice;
    } else if (transactionType == "internal-transfer-approval") {
      title = "Internal Transfer Approval Notification";
      return internalApproval;
    } else if (transactionType == "withdrawal-approval") {
      title = "Withdrawal Approval Notification";
      return withdrawalApproval;
    } else if (transactionType == "credit-approval") {
      title = "Credit Approval Notification";
      return creditApproval;
    }
  };

  const notice = {
    username: username,
    message: getTransctionMsg(),
    subject: title,
    date: date,
    dateCreated: dateCreated,
  };

  await Notification.create(notice);
};
