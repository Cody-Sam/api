const mongoose = require("../connection");

const OrderModel = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      products: [
        {
          _id: { type: String },
          name: { type: String },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
      // subtotal: {
      //   type: Number,
      //   required: true,
      // },
      total: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      address: {
        type: Object,
        // required: true
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = OrderModel;
