import express from "express";
import {
  getPosts,
  getUserPosts,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/postsController.js";
import auth from "../middlewares/auth.js";

// Create an express app
const router = express.Router();

// Get user posts route
router.get("/user", auth, getUserPosts);

// Get all posts route
router.get("/", getPosts);

// Add new post route
router.post("/", auth, addPost);

// Delete post route
router.delete("/:id", auth, deletePost);

// Update post route
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
