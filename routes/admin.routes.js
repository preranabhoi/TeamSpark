import express from "express";
import {
  getAllUsers,
  deleteUserById,
  updateUserRole,
} from "../controller/admin.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

router.use(authenticateUser, authorizeAdmin);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUserById);

router.put("/users/:id/role", updateUserRole);

export default router;
