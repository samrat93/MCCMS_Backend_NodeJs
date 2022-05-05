const express = require("express");
const { auth } = require("../middleware/authMiddleware");

const {
  StateGet,
  StatePost,
  StateUpdate,
  StateDelete,
} = require("../controllers/stateController");

const router = express.Router();

router.post("/state/post", auth, StatePost);
router.get("/state/get", auth, StateGet);
router.patch("/state/update/:id", auth, StateUpdate);
router.delete("/state/delete/:id", auth, StateDelete);

module.exports = router;
