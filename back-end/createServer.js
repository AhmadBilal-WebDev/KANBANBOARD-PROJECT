const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./createDataBase");
const router = require("./createRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT_URL;

app.get("/", (req, res) => {
  res.send("HLLOW BILAL HOW ARE YOU!");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/kanban", router);

app.listen(PORT, () => {
  console.log(`Server Is Runing On http://localhost:${PORT}`);
});
