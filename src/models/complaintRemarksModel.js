const mongoose = require("mongoose");

const complaintRemarksSchema = new mongoose.Schema(
  {
    complaintStatus: {
      type: String,
      enum: ["Processing", "Closed"],
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    complaintNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  },
  { timestamps: true }
);

const ComplaintRemarks = mongoose.model(
  "ComplaintRemarks",
  complaintRemarksSchema
);
module.exports = ComplaintRemarks;
