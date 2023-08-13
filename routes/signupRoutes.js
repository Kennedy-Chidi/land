const express = require("express");
const signupController = require("../controllers/signupController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(signupController.createSignup, signupController.getSignup)
  .get(signupController.getSignup);

router.route("/:id").patch(
  // authController.protect,
  signupController.updateSignup,
  signupController.getSignup
);

module.exports = router;
