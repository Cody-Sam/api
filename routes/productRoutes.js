const express = require("express");
const router = express.Router();
const {
  productIndex,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", productIndex);
router.post("/", adminProtect, createProduct);
router.put("/", adminProtect, updateProduct);
router.delete("/", adminProtect, deleteProduct);

module.exports = router;
