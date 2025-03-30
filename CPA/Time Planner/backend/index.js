require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  deadline: String,
  completed: Boolean
}));

app.get("/tasks", async (req, res) => {
  try {
    res.json(await Task.find());
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({ ...req.body, completed: false });
    await task.save();
    res.json({ message: "Task added", task });
  } catch (err) {
    res.status(500).json({ message: "Error adding task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

app.get("/run-cpp", (req, res) => {
  exec("..\\core\\task_manager.exe", (error, stdout, stderr) => {
    if (error) {
      console.error(`Exec error: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`Output: ${stdout}`);
    res.send(stdout);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
