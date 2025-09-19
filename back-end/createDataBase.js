const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.URL;
mongoose.connect(DB_URL,{

});

const db = mongoose.connection;
db.on("connected", () => console.log("DB Connect Successfully ✅"));
db.on("disconnected", () => console.log("DB DisConnect Successfully ✅"));
db.on("error", () => console.log("Something Error In Connect DB ❌"));

module.exports = db;
