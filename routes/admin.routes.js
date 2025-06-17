import express from "express";
import {
  getAllUsers,
  deleteUserById,
  updateUserRole,
} from "../controller/admin.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();


router.use(authenticateUser, authorizeAdmin);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUserById);

router.put("/users/:id/role", updateUserRole);

export default router;
