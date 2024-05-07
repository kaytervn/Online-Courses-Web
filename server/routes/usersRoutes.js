import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  getUserListByRole,
  disableUser,
  enableUser,
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
router.get("/:role", getUserListByRole);

//disable user
router.post("/disable/:id", disableUser);

//enable user
router.post("/enable/:id", enableUser);

export { router as usersRoutes };
