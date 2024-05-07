import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/usersController.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:id/:token", resetPassword);

export { router as usersRoutes };
