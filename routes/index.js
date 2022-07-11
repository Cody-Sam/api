const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const buildRoutes = require("./buildRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/builds", buildRoutes);

module.exports = router;
