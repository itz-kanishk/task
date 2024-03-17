const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");

// GET all tasks
router.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const is_admin = await User.findById(id);
  let bool = is_admin.is_admin;
  if (bool) {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    const email = is_admin.email;
    try {
      const tasks = await Task.find({
        assign_to: email,
      });
      res.json(tasks);
    } catch (err) {
      console.log("here");
      res.json({ message: err });
    }
  }
});

router.post("/tasks", async (req, res) => {
  const id = req.body.user_id;
  const is_admin = await User.findById(id);
  let bool = is_admin.is_admin;
  console.log(req.body);
  console.log(bool);
  if (bool) {
    const task = new Task({
      title: req.body.title,
      assign_to: req.body.assign_to,
    });
    try {
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    res.json({ message: "You are not allowed to create a task" });
  }
});

router.put("/tasks/:taskId", async (req, res) => {
  const id = req.body.user_id;
  const user_data = await User.findById(id);
  const task_id = req.params.taskId;
  const task = await Task.findById(task_id);
  console.log(task.assign_to);
  console.log(user_data.email);
  if (task.assign_to === user_data.email) {
    task.completed = !task.completed;
    try {
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    res.json({ message: "You are not allowed to update this task" });
  }
});

//register or sign up or sign in a user

router.post("/users", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    password: password,
  });
  if (user) {
    res.json(user);
  } else {
    const count = await User.countDocuments({
      is_admin: true,
    });
    if (count > 0) {
      req.body.is_admin = false;
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      is_admin: req.body.is_admin,
    });
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

module.exports = router;
