import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },

  dueDate: {
    type: Date,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
