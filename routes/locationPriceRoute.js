const express = require("express");
const router = express.Router();
const {
  insertPrice,
  deletePriceInLocation,
  updateNewPrice,
} = require("../controllers/locationPriceController");

const authenticateToken = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, insertPrice);
router.put("/:id", authenticateToken, updateNewPrice);
router.delete("/:id", authenticateToken, deletePriceInLocation);

module.exports = router;
