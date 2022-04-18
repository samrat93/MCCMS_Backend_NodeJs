const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  Sub_CategoryPost,
  Sub_CategoryGet,
  Sub_CategoryDelete,
  Sub_CategoryUpdate,
} = require("../controllers/subCategoryController");

const router = express.Router();

router.post("/subcategory", auth, Sub_CategoryPost);
router.get("/subcategory", auth, Sub_CategoryGet);
router.patch("/subcategory/:id", auth, Sub_CategoryUpdate);
router.delete("/subcategory/:id", auth, admin, Sub_CategoryDelete);

module.exports = router;
