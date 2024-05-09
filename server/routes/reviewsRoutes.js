import express from "express";

import auth from "../middlewares/auth.js";
import { createReview } from "../controllers/reviewsController.js";

const router = express.Router();

router.post("/create_review/:courseId", auth, createReview)
export { router as reviewsRoutes };
