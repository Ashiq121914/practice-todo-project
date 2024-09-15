const TodoModel = require("../models/TodoListModel.js");

const jwt = require("jsonwebtoken");

// create todo
exports.CreateTodo = async (req, res) => {
  try {
    const reqBody = req.body; // Renamed to better reflect the content

    let TodoSubject = reqBody["TodoSubject"];
    let TodoDescription = reqBody["TodoDescription"];
    let Username = req.headers["username"];

    let PostBody = {
      Username: Username,
      TodoSubject: TodoSubject,
      TodoDescription: TodoDescription,
    };

    const newTodo = await TodoModel.create(PostBody);

    res.status(201).json({
      status: "success",
      data: newTodo,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while inserting the todo",
    });
  }
};

// select todo
exports.SelectTodo = async (req, res) => {
  try {
    const Username = req.headers["username"];
    const data = await TodoModel.find({ Username: Username });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while reading the data",
    });
  }
};

// update todo
exports.UpdateTodo = async (req, res) => {
  try {
    let TodoDescription = req.body["TodoDescription"];
    let TodoStatus = req.body["TodoStatus"];
    let _id = req.body["_id"];

    let PostBody = {
      TodoDescription: TodoDescription,
      TodoStatus: TodoStatus,
      _id: _id,
    };

    const data = await TodoModel.updateOne(
      { _id: _id },
      { $set: PostBody },
      { upsert: true }
    );

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while reading the data",
    });
  }
};
