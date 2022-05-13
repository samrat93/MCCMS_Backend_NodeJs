const express = require("express");
const { auth } = require("../middleware/authMiddleware");

const {
  FeedbackGet,
  FeedbackPost,
  FeedbackUpdate,
  FeedbackDelete,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedback", FeedbackPost);
router.get("/feedback", auth, FeedbackGet);
router.patch("/feedback/:id", auth, FeedbackUpdate);
router.delete("/feedback/:id", auth, FeedbackDelete);

module.exports = router;
