import express from "express";
import auth from "../middlewares/auth.js";
import {
  createComment,
  getLessonComments,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/get-lesson-comments", getLessonComments);

router.delete("/create-comment", auth, createComment);

export { router as commentsRoutes };
