import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-profile", authenticateUser, getUserProfile);         
router.put("/update-profile", authenticateUser, updateUserProfile);      
router.delete("/delete-profile", authenticateUser, deleteUserAccount);  
export default router;
