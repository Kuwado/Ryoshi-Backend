const express = require("express");
const router = express.Router();
const {
  getListLocations,
  getLocationDetail,
  insertLocation,
  deleteALocation,
  getLocationDetailWithUser,
  updateLocationDetail,
} = require("../controllers/locationController");
const authenticateToken = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadImg");
const uploadFileImg = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

router.get("/", authenticateToken, getListLocations);
router.get("/:id", authenticateToken, getLocationDetail);
router.post("/:id/withDistance", authenticateToken, getLocationDetailWithUser);
router.post("/", authenticateToken, uploadFileImg, insertLocation);
router.put("/:id", authenticateToken, uploadFileImg, updateLocationDetail);
router.delete("/:id", authenticateToken, deleteALocation);

module.exports = router;
