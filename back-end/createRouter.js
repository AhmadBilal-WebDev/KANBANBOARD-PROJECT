const express = require("express");
const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("./createControler");

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
