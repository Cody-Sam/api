const mongoose = require("../connection");

const OrderModel = mongoose.model(
  "Order",
  new mongoose.Schema({
    address: {
      type: String,
      required: true,
    },
  })
);

module.exports = OrderModel;
