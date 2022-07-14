const mongoose = require("../connection");

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
      },
      admin: {
        type: Boolean,
        required: true
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = UserModel;
