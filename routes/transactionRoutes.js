const express = require("express");
const transactionController = require("../controllers/transactionController");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const router = express.Router();

// router.route("/toggle-status/:id").patch(
//   // authController.protect,
//   transactionController.toggleCurrencyStatus
// );

router.get("/notifications", notificationController.getNotifications);
router.get("/get-volumes", transactionController.getTransactionVolume);
router.get("/active-deposits", transactionController.getActiveDeposits);
router.patch(
  "/continue-earnings/:id",
  transactionController.continueEarnings,
  transactionController.getActiveDeposits
);
router.get("/earnings", transactionController.getEarnings);
router.get("/history", transactionController.getHistory);
router.get("/deposit-list", transactionController.getDepositList);
router.patch(
  "/approve-withdrawal/:id",
  transactionController.approveWithdrawal,
  transactionController.getTransactions
);
router.patch(
  "/update-transaction/:id",
  transactionController.updateTransaction,
  transactionController.getTransactions
);

router
  .route("/")
  .post(
    authController.protect,
    transactionController.createTransaction,
    transactionController.getTransactions
  )
  .get(authController.protect, transactionController.getTransactions);

router
  .route("/:id")
  .patch(
    authController.protect,
    transactionController.approveDeposit,
    transactionController.getTransactions
  )
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    transactionController.deleteTransaction,
    transactionController.getTransactions
  );

module.exports = router;
