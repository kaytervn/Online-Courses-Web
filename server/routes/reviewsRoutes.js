import express from "express";

import auth from "../middlewares/auth.js";
import {
  createReview,
  getReviewCourse,
} from "../controllers/reviewsController.js";

const router = express.Router();

router.post("/create_review/:courseId", auth, createReview)

router.get("/get-review-course/:courseId", getReviewCourse);
export { router as reviewsRoutes };
