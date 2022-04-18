const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  CategoryPost,
  CategoryList,
  CategoryUpdate,
  CategoryDelete,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/category", auth, CategoryPost);
router.get("/category", auth, CategoryList);
router.patch("/category/:id", auth, CategoryUpdate);
router.delete("/category/:id", auth, admin, CategoryDelete);

module.exports = router;
