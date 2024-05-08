import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  getUserListByRole,
  getUserByOther,
  changeUserStatus,
} from "../controllers/usersController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:id/:token", resetPassword);

//get user
router.get("/", auth, getUser);

//get all users by role
router.get("/role/:role", getUserListByRole);

//get user by other
router.get("/:id", getUserByOther);

// change user status
router.put("/change-user-status/:id", auth, changeUserStatus);

export { router as usersRoutes };
