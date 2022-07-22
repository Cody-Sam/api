const express = require("express");
const router = express.Router();
const {
  orderIndex,
  getOrder,
  getMyOrders,
  getPurchase,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", adminProtect, orderIndex)
router.get("/purchase", protect, getPurchase)
router.get("/me", protect, getMyOrders);
router.get("/:id", getOrder)
router.post("/", protect, createOrder)
router.put("/:id", adminProtect, updateOrder)
router.delete("/", adminProtect, deleteOrder)

module.exports = router;
