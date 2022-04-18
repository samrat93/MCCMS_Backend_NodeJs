const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaint_subject: {
      type: String,
      required: true,
    },
    complaint_details: {
      type: String,
      required: false,
    },
    complaint_status: {
      type: String,
      enum: ["Pending", "Processing", "Closed"],
      required: true,
      default: "Pending",
    },
    complaint_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    complaint_sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub_Category",
    },
    complaint_file: {
      type: String,
      required: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
