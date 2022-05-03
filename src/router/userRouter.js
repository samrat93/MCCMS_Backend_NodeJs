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
  ActiveUsers,
  UnverifiedUsers,
  exportUser,
  logout,
  logoutAll,
} = require("../controllers/userController");

const router = new express.Router();

router.post("/users/registration", Register);
router.post("/users/login", Login);
router.get("/users/listalluser", auth, listAllUser);
router.delete("/user/delete/:id", auth, admin, userDelete);
router.patch("/user/verify/:id", auth, verifyUser);
router.post("/users/forgetpassword", ForgetPassword);
router.patch("/users/passwordchange", UpdatePassword);
router.get("/users/active-users", auth, ActiveUsers);
router.get("/users/inactive-users", auth, UnverifiedUsers);
router.get("/users/download", auth, exportUser);
router.post("/users/logout", auth, logout);
router.post("/users/logoutall", auth, logoutAll);

module.exports = router;
