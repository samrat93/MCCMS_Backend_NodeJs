const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "2m",
  },
});

const OtP = mongoose.model("Otp", otpSchema);
module.exports = OtP;
