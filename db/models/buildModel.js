const mongoose = require("../connection");

const BuildModel = mongoose.model(
  "Build",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
            // ^^ Allows a user to be associated with a build
      },
    ram: {
      type: String,
      required: true,
    },
  })
);

module.exports = BuildModel;
