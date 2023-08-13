const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  recaptcha: {
    type: Boolean,
    default: false,
  },
  residence: {
    type: Boolean,
    default: false,
  },
  age: {
    type: Boolean,
    default: false,
  },
  origin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: Boolean,
    default: false,
  },
  identity: {
    type: Boolean,
    default: false,
  },
  kin: {
    type: Boolean,
    default: false,
  },
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
