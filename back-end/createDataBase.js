const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => console.log("DB Connect Successfully ✅"));
db.on("disconnected", () => console.log("DB DisConnect Successfully ✅"));
db.on("error", () => console.log("Something Error In Connect DB ❌"));

module.exports = db;
