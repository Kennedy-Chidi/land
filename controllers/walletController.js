const Wallet = require("../models/walletModel");
const Currency = require("../models/currencyModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createWallet = catchAsync(async (req, res) => {
  const data = req.body;

  data.currencies.forEach(async (el) => {
    const walletResult = await Wallet.findOne({
      currencyId: el._id,
      username: data.user.username,
    });

    const form = {
      name: el.name,
      currencyId: el._id,
      username: data.user.username,
      symbol: el.symbol,
      walletAddress: el.address,
    };

    console.log(walletResult._id, el.address);

    if (walletResult == null) {
      await Wallet.create(form);
    } else {
      await Wallet.findByIdAndUpdate(
        walletResult._id,
        { walletAddress: el.address },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    }
  });

  res.status(200).json({
    status: "success",
    // data: Wallet,
  });
});

exports.getWallet = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Wallet.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;
  const features = result.paginate();
  const currencyResult = await Currency.find();

  if (currencyResult.length > resultLen.length) {
    for (let i = 0; i < currencyResult.length; i++) {
      const walletResult = await Wallet.findOne({
        username: req.query.username,
        currencyId: currencyResult[i]._id,
      });
      if (walletResult == null) {
        await Wallet.create({
          username: req.query.username,
          currencyId: currencyResult[i]._id,
          name: currencyResult[i].name,
          symbol: currencyResult[i].symbol,
          balance: 0,
          walletAddress: "",
        });
      }
    }
  }
  const wallets = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: wallets,
    length: resultLen.length,
  });
});

exports.updateWallet = catchAsync(async (req, res, next) => {
  const data = req.body;

  data.wallets.forEach(async (el) => {
    await Wallet.findByIdAndUpdate(el._id, {
      walletAddress: el.walletAddress,
    });
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteWallet = catchAsync(async (req, res, next) => {
  const wallet = await Wallet.findByIdAndDelete(req.params.id);

  if (!wallet) {
    return next(new AppError("No Wallet found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});

exports.getAWallet = catchAsync(async (req, res, next) => {
  const wallets = await Wallet.findOne({ username: req.params.id });

  if (wallets.length == 0) {
  }

  res.status(200).json({
    status: "success",
    data: wallets,
  });
});

exports.getAWalletId = catchAsync(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: wallet,
  });
});
