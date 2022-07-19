const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const buildRoutes = require("./buildRoutes");
const checkoutRoutes = require('./checkoutRoutes')

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/builds", buildRoutes);
router.use("/checkout", checkoutRoutes)


module.exports = router;
