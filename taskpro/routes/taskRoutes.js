const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/add", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title
    });

    const savedTask = await newTask.save();
    res.json(savedTask);

  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error creating task" });
  }
});

module.exports = router;

// READ ALL TASKS
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
});

// UPDATE TASK (toggle completed or change title)
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
});

// DELETE a task
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task deleted",
      task: deletedTask
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
});
