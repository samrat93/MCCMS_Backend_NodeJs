const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");

const {
  ComplaintPost,
  ComplaintGet,
  ComplaintDelete,
  ComplaintUpdate,
  upload,
  ListAllComplaint,
  PendingComplaintList,
  ProcessingComplaintList,
  ClosedComplaintList,
} = require("../controllers/complaintController");

const router = express.Router();
router.post("/complaint", auth, upload.single("complaintFile"), ComplaintPost);
router.get("/complaint/individual/:id", auth, ComplaintGet);
router.patch(
  "/complaint/:id",
  auth,
  upload.single("complaintFile"),
  ComplaintUpdate
);
router.delete("/complaint/:id", auth, ComplaintDelete);
router.get("/complaint/all", auth, admin, ListAllComplaint);
router.get("/complaint/pending", auth, PendingComplaintList);
router.get("/complaint/processing", auth, ProcessingComplaintList);
router.get("/complaint/closed", auth, ClosedComplaintList);

module.exports = router;
