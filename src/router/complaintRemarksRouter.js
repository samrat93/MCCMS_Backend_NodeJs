const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  ComplaintRemarksPost,
} = require("../controllers/complaintRemarksController");

const router = new express.Router();

router.post("/complaint-remarks", auth, admin, ComplaintRemarksPost);

module.exports = router;
