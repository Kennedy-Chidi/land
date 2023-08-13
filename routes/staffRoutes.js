const express = require("express");
const staffController = require("../controllers/staffController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.fields([
      { name: "coloredMediaIcon", maxCount: 10 },
      { name: "image", maxCount: 1 },
    ]),
    staffController.createStaff,
    staffController.getStaffs
  )
  .get(staffController.getStaffs);

router
  .route("/:id")
  .get(staffController.getAStaff)
  .patch(
    upload.upload.single("image"),
    upload.upload.fields([{ name: "coloredMediaIcon", maxCount: 10 }]),
    staffController.updateStaff,
    deleteFile,
    staffController.getStaffs
  )
  .delete(staffController.deleteStaff, deleteFile, staffController.getStaffs);

module.exports = router;
