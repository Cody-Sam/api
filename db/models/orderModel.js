const mongoose = require("../connection");

const OrderModel = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
    {
    timestamps: true
  })
);

module.exports = OrderModel;
