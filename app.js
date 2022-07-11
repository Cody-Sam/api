const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const apiV1Routes = require("./routes");
app.use(express.json());
app.use(cors());

app.get("/api/v1", (req, res) => res.send({ info: "Pc Builder API" }));

app.use("/api/v1", apiV1Routes);



module.exports = app;