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
      compatibility: {
        applicable: {
          type: Boolean,
          required: true
        },
        cpu: {
          type: String,
        },
        ram: {
          type: String,
        },
        pci: {
          type: String
        },
        m2: {
          type: String
        }
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = ProductModel;
