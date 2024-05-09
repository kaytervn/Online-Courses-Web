import express from "express";
import auth from "../middlewares/auth.js";
import {
  createLesson,
  deleteLesson,
  getCourseLessons,
} from "../controllers/lessonsController.js";

const router = express.Router();

router.get("/get-course-lessons", getCourseLessons);

router.delete("/delete-lesson/:id", auth, deleteLesson);

router.post("/create-lesson", auth, createLesson);

export { router as lessonsRoutes };
