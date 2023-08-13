const express = require("express");
const referralController = require("../controllers/referralController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(referralController.getReferral);

router
  .route("/:id")
  .delete(referralController.deleteReferral, referralController.getReferral);

module.exports = router;
