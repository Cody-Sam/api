const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createCheckoutSession,
    stripeWebhook
} = require("../controllers/checkoutController");


router.post("/create", protect, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

module.exports = router;
