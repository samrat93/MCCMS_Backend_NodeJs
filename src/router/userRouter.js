const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const { Register, Login } = require("../controllers/userController");

const router = new express.Router();

router.post("/users", Register);
router.post("/users/login", Login);

module.exports = router;
