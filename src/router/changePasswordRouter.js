const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { changePassword } = require("../controllers/changePasswordController");

const router = express.Router();

router.patch("/user/change-new-password", auth, changePassword);

module.exports = router;
