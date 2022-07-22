const express = require("express");
const router = express.Router();
const {
  productIndex,
  getProduct,
  getBuildItems,
  createProduct,
  updateProduct,
  addReview,
  deleteProduct,
  getWatchListProducts
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminOnlyMiddleware");

router.get("/", productIndex);
router.get("/:id", getProduct);
router.post("/build", protect, getBuildItems);
router.post("/review", protect, addReview);
router.post("/watchlist", getWatchListProducts);
router.post("/", adminProtect, createProduct);
router.put("/", adminProtect, updateProduct);
router.delete("/", adminProtect, deleteProduct);

module.exports = router;
