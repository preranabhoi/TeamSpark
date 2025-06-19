import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validator/auth.validator.js";

import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();


router.post("/register", registerUser,validateRequest, registerValidator);

router.get("/verify/:token", verifyUser);

router.post("/login", loginUser ,validateRequest, loginValidator);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword, validateRequest, forgotPasswordValidator);

router.post("/reset-password/:token", resetPassword , validateRequest,resetPasswordValidator);

export default router;
