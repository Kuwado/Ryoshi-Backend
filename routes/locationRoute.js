const express = require("express");
const router = express.Router();
const {
  getListLocations,
  getLocationDetail,
  insertLocation,
  deleteALocation,
  updateLocationDetail,
} = require("../controllers/locationController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, getListLocations);
router.get("/:id", authenticateToken, getLocationDetail);
router.post("/", authenticateToken, insertLocation);
router.put("/:id", authenticateToken, updateLocationDetail);
router.delete("/:id", authenticateToken, deleteALocation);

module.exports = router;
