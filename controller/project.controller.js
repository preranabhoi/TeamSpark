import Project from "../model/project.model.js";
import User from "../model/user.model.js";

 const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      members, 
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, message: "Project created", project });

  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error });
  }
};





const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).populate("members", "name email");

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};







const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ message: "Error getting project", error });
  }
};






const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, members } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.members = members || project.members;

    await project.save();

    res.status(200).json({ success: true, message: "Project updated", project });
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error });
  }
};





const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error });
  }
};



export{createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject}