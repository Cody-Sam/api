const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser"); 
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
dotenv.config();
const apiV1Routes = require("./routes");
app.use(express.json());


app.get("/api/v1", (req, res) => res.send({ info: "Pc Builder 9001 API" }));

app.use("/api/v1", apiV1Routes);



module.exports = app;
