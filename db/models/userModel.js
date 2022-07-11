const mongoose = require("../connection");

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
  })
);

module.exports = UserModel;
