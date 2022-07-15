const express = require("express");
const router = express.Router();
const {
    createCheckoutSession
} = require("../controllers/checkoutController");

router.post("/create", createCheckoutSession);

module.exports = router;
