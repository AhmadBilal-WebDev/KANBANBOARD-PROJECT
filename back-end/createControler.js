const taskModel = require("./createModel");

const createTask = async (req, res) => {
  try {
    const result = req.body;
    const model = new taskModel(result);
    const data = await model.save();
    console.log("Task Post In DB ✅");
    res.status(201).json({ message: "task is created", success: true, data });
  } catch (error) {
    console.log("Something Error In Post Task ❌");
    res
      .status(500)
      .json({ message: "Something Error In Post Task ❌", success: false });
  }
};

const getAllTask = async (req, res) => {
  try {
    const data = await taskModel.find();
    console.log("Task Get From DB ✅");
    res.status(200).json({ message: "all task fetch", success: true, data });
  } catch (error) {
    console.log("Something Error In Fetch Task ❌");
    res
      .status(500)
      .json({ message: "Something Error In Fetch Task ❌", success: false });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await taskModel.findByIdAndUpdate(id, body);
    console.log("Task Updated From DB ✅");
    res.status(200).json({ message: "task updated", success: true, data });
  } catch (error) {
    console.log("Something Error In Update Task ❌");
    res
      .status(500)
      .json({ message: "Something Error In Update Task ❌", success: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await taskModel.findByIdAndDelete(id);
    console.log("Task Deleted From DB ✅");
    res.status(200).json({ message: "task deleted", success: true, data });
  } catch (error) {
    console.log("Something Error In Delete Task ❌");
    res
      .status(500)
      .json({ message: "Something Error In Delete Task ❌", success: false });
  }
};

module.exports = { createTask, getAllTask, updateTask, deleteTask };
