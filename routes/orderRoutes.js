const express = require("express");
const router = express.Router();
const {
  orderIndex,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", adminProtect, orderIndex)
router.get("/:id", getOrder)
router.post("/", protect, createOrder)
router.put("/:id", adminProtect, updateOrder)
router.delete("/:id", adminProtect, deleteOrder)

module.exports = router;
