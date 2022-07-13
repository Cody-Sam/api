const express = require("express");
const router = express.Router();
const {
  buildIndex,
  getBuild,
  getMyBuilds,
  createBuild,
  updateBuild,
  deleteBuild,
} = require("../controllers/buildController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", adminProtect, buildIndex);
router.get("/me", protect, getMyBuilds);
router.get("/:id", protect, getBuild);
router.post("/", protect, createBuild);
router.put("/:id", protect, updateBuild);
router.delete("/:id", protect, deleteBuild);

module.exports = router;
