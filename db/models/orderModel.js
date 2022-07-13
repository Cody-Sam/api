const mongoose = require("../connection");

const OrderModel = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      build: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Build",
      },
      products: {
        type: Array
        // Array of multiple product ID's
      },
      total: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = OrderModel;
