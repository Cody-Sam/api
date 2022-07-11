const mongoose = require("../connection");

const ProductModel = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports = ProductModel;
