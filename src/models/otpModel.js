const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: "5m",
    },
  },
  { timestamps: true }
);

const OtP = mongoose.model("Otp", otpSchema);
module.exports = OtP;
