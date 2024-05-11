import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfileInformation,
  changePassword,
  getUser,
  getUserListByRole,
  getUserByOther,
  changeUserStatus,
  checkEmailOTPUser,
} from "../controllers/usersController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// register user
router.post("/register", registerUser);

// otp authentication
router.post("/otp-authentication", checkEmailOTPUser);

//login user
router.post("/login", loginUser);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:id/:token", resetPassword);

//get user
router.get("/", auth, getUser);

// update profile information
router.put(
  "/update-profile",
  auth,
  upload.single("picture"),
  updateProfileInformation
);

// change password
router.put("/change-password", auth, changePassword);

//get all users by role
router.get("/get-list-users/:role", auth, getUserListByRole);

//get user by other
router.get("/:id", getUserByOther);

// change user status
router.put("/change-user-status/:id", auth, changeUserStatus);

export { router as usersRoutes };
