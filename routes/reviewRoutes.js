const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("image"),
    reviewController.createReview,
    reviewController.getReview
  )
  .get(reviewController.getReview);

router
  .route("/:id")
  .patch(
    // authController.protect,
    upload.upload.single("image"),
    reviewController.updateReview,
    deleteFile,
    reviewController.getReview
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    reviewController.deleteReview,
    deleteFile,
    reviewController.getReview
  );

module.exports = router;
