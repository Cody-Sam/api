const express = require("express");
const router = express.Router();
const {
  productIndex,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getWatchListProducts
} = require("../controllers/productController");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", productIndex);
router.get("/:id", getProduct);
router.post("/watchlist", getWatchListProducts);
router.post("/", adminProtect, createProduct);
router.put("/", adminProtect, updateProduct);
router.delete("/", adminProtect, deleteProduct);

module.exports = router;
