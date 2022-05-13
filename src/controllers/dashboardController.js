const User = require("../models/userModel");
const Complaint = require("../models/complaintModel");
const Feedbacks = require("../models/feedbackModel");
const Category = require("../models/complaintCategoryModel");
const mongoose = require("mongoose");
const DashboardAPI = async (req, res) => {
  try {
    const totalUsers = await User.find({ isAdmin: false });
    const activeUsers = await User.find({ verify: true, isAdmin: false });
    const inactiveUser = await User.find({ verify: false });
    const totalComplaint = await Complaint.find({});
    const pendingComplaint = await Complaint.find({
      complaintStatus: "Pending",
    });
    const processingComplaint = await Complaint.find({
      complaintStatus: "Processing",
    });
    const closedComplaint = await Complaint.find({ complaintStatus: "Closed" });
    const feedbacks = await Feedbacks.find({});
    const category = await Category.find({});
    res.status(200).send({
      Users: {
        total: totalUsers?.length,
        active: activeUsers?.length,
        inactive: inactiveUser?.length,
      },
      Complaints: {
        total: totalComplaint?.length,
        pending: pendingComplaint?.length,
        processing: processingComplaint?.length,
        closed: closedComplaint?.length,
      },
      feedbacks: feedbacks?.length,
      category: category?.length,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const DashboardPublicAPI = async (req, res) => {
  try {
    const id = req.user._id;
    const totalComplaint = await Complaint.find({
      userId: id,
    });

    const pendingComplaint = await Complaint.find({
      userId: id,
      complaintStatus: "Pending",
    });
    const processingComplaint = await Complaint.find({
      userId: id,
      complaintStatus: "Processing",
    });
    const closedComplaint = await Complaint.find({
      userId: id,
      complaintStatus: "Closed",
    });

    res.status(200).send({
      Complaints: {
        pend: pendingComplaint.length,
        proc: processingComplaint.length,
        closed: closedComplaint.length,
        totalComplaint,
        pendingComplaint,
        processingComplaint,
        closedComplaint,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  DashboardAPI,
  DashboardPublicAPI,
};
