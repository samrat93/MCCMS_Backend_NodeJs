const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintSubject: {
      type: String,
      required: true,
    },
    complaintDetails: {
      type: String,
      required: false,
    },
    complaintStatus: {
      type: String,
      enum: ["Pending", "Processing", "Closed"],
      required: true,
      default: "Pending",
    },
    complaintCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    complaintFile: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
