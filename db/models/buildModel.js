const mongoose = require("../connection");

const BuildModel = mongoose.model(
  "Build",
  new mongoose.Schema({
    ram: {
      type: String,
      required: true,
    },
  })
);

module.exports = BuildModel;
