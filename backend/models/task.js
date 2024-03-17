const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assign_to: {
    type: String,
    required: true,
    // reference to the User model
    ref: "User",
  },
  deadline: {
    type: String,
  },
});

module.exports = mongoose.model("Task", taskSchema);
