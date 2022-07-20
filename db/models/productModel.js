const mongoose = require("../connection");

const ProductModel = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true
      },
      sold: {
        type: Number,
        default: 0
      },
      compatibility: {
        type: Object
      },
      image: {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = ProductModel;
