const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");

const {
  ComplaintPost,
  ComplaintGet,
  ComplaintDelete,
  ComplaintUpdate,
  upload,
  ListAllComplaint,
} = require("../controllers/complaintController");

const router = express.Router();
router.post("/complaint", auth, upload.single("complaint_file"), ComplaintPost);
router.get("/complaint/individual/:id", auth, ComplaintGet);
router.patch(
  "/complaint/:id",
  auth,
  upload.single("complaint_file"),
  ComplaintUpdate
);
router.delete("/complaint/:id", auth, ComplaintDelete);
router.get("/complaint/all", auth, admin, ListAllComplaint);

module.exports = router;
