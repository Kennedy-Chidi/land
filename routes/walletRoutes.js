const express = require("express");
const walletController = require("../controllers/walletController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(walletController.createWallet)
  .get(walletController.getWallet)
  .patch(walletController.updateWallet);

router
  .route("/:id")
  .get(walletController.getAWalletId)
  .patch(authController.protect, walletController.updateWallet)
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    walletController.deleteWallet
  );

module.exports = router;
