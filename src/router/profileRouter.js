const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { upload, ProfileUpdate } = require("../controllers/profileController");

const router = express.Router();

router.patch("/profile/:id", auth, upload.single("user_image"), ProfileUpdate);

module.exports = router;
