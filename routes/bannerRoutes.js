const express = require("express");
const bannerController = require("../controllers/bannerController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("bannerImage"),
    bannerController.createBanner,
    bannerController.getBanner
  )
  .get(bannerController.getBanner);

router
  .route("/:id")
  .patch(
    upload.upload.single("bannerImage"),
    bannerController.updateBanner,
    deleteFile,
    bannerController.getBanner
  )
  .delete(
    bannerController.deleteBanner,
    deleteFile,
    bannerController.getBanner
  );

module.exports = router;
