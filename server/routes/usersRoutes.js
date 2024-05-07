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
  getUserByOther,
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

//disable user
router.post("/disable/:id", disableUser);

//enable user
router.post("/enable/:id", enableUser);

//get user by other
router.get("/:id", getUserByOther);

export { router as usersRoutes };
