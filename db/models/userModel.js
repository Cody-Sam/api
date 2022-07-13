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
      address: {
        streetNumber: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postCode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        }
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
