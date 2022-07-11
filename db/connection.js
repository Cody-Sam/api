const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() =>
    console.log(
      mongoose.connection.readyState == 1
        ? "Mongoose Connected!"
        : "Connection failed"
    )
  )
  .catch((err) => console.log(err));

module.exports = mongoose;
