const mongoose = require("../connection");

const BuildModel = mongoose.model(
  "Build",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        // ^^ Allows a user to be associated with a build
      },
      ram: {
        type: Array,
        //Array of one or more product ID's
        required: true,
      },
      psu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      motherboard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      gpu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      ssd: {
        type: Array,
        // Array of one or more product ID's
        required: true,
      },
      case: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = BuildModel;
