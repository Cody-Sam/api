const mongoose = require("../connection");
const {isEmail} = require('validator')

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
        minlength: [3, "Minimum name length is 2 characters"]
      },
      email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Minimum password length is 6 characters"]
      },
      admin: {
        type: Boolean,
        required: [true, "Admin status not specififed"]
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = UserModel;
