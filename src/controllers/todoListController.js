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
