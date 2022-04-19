const ComplaintRemarks = require("../models/complaintRemarksModel");

const ComplaintRemarksPost = async (req, res) => {
  try {
    const complaintRemarks = new ComplaintRemarks(req.body);
    await complaintRemarks.save();
    res.status(201).send(complaintRemarks);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { ComplaintRemarksPost };
