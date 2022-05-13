const express = require("express");
const {
  DashboardAPI,
  DashboardPublicAPI,
} = require("../controllers/dashboardController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard/all-data", auth, DashboardAPI);
router.get("/dashboard/public/all-data", auth, DashboardPublicAPI);
module.exports = router;
