import Task from "../model/task.model.js";



const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, project } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "Title and project are required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      status,
      project,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};




const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate("project", "name");
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};





const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
};






const updateTask = async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ success: true, message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};






const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};



export{createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,}