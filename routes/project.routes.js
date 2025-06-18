import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

import { authenticateUser, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, createProject);

router.get("/", authenticateUser, getAllProjects);

router.get("/:projectId", authenticateUser, getProjectById);

router.put("/:projectId", authenticateUser, updateProject);

router.delete("/:projectId", authenticateUser, deleteProject);

export default router;
