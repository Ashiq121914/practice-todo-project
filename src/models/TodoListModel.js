const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    Username: { type: String },
    TodoSubject: { type: String },
    TodoDescription: { type: String },
    TodoStatus: { type: String, default: "New" },
  },
  { versionKey: false, timestamps: true }
);

const TodoListModel = mongoose.model("todolists", DataSchema);
module.exports = TodoListModel;
