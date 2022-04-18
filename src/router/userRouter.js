const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  Register,
  Login,
  listAllUser,
  userDelete,
  verifyUser,
  ForgetPassword,
  UpdatePassword,
} = require("../controllers/userController");

const router = new express.Router();

router.post("/users", Register);
router.post("/users/login", Login);
router.get("/users", auth, listAllUser);
router.delete("/user/delete/:id", auth, admin, userDelete);
router.patch("/user/verify/:id", auth, verifyUser);
router.post("/users/forgetpassword", ForgetPassword);
router.patch("/users/passwordchange", UpdatePassword);

module.exports = router;
