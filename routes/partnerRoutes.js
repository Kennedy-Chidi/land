const express = require("express");
const partnerController = require("../controllers/partnerController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("image"),
    partnerController.createPartner,
    partnerController.getPartner
  )
  .get(partnerController.getPartner);

router
  .route("/:id")
  .patch(
    upload.upload.single("image"),
    partnerController.updatePartner,
    deleteFile,
    partnerController.getPartner
  )
  .delete(
    partnerController.deletePartner,
    deleteFile,
    partnerController.getPartner
  );

module.exports = router;
