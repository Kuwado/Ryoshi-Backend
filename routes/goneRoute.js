const express = require("express");
const router = express.Router();
const {
  insertLocationToGone,
  destroyAGone,
} = require("../controllers/goneController");
const authentcateToken = require("../middlewares/authMiddleware");

router.post("/", authentcateToken, insertLocationToGone);
router.delete("/:id", authentcateToken, destroyAGone);

module.exports = router;
