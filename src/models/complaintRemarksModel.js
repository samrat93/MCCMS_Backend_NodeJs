const mongoose = require("mongoose");

const complaintRemarksSchema = new mongoose.Schema(
  {
    complaint_status: {
      type: String,
      enum: ["Processing", "Closed"],
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    complaint_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  },
  { timestamps: true }
);
