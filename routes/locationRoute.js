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
const upload = require("../middlewares/uploadImg");

router.get("/", authenticateToken, getListLocations);
router.get("/:id", authenticateToken, getLocationDetail);
router.post("/", authenticateToken, upload.array("images", 10), insertLocation);
router.put(
  "/:id",
  authenticateToken,
  upload.array("images", 10),
  updateLocationDetail
);
router.delete("/:id", authenticateToken, deleteALocation);

module.exports = router;
