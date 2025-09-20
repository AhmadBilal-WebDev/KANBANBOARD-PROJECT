const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL =
  "mongodb+srv://kanban-board:kanbanboard@kanban-board.tfvfw4w.mongodb.net/Kanban-Board?retryWrites=true&w=majority&appName=KANBAN-BOARD";
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => console.log("DB Connect Successfully ✅"));
db.on("disconnected", () => console.log("DB DisConnect Successfully ✅"));
db.on("error", () => console.log("Something Error In Connect DB ❌"));

module.exports = db;
