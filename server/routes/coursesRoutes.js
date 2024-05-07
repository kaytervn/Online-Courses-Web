import express from "express";
import multer from "multer";
import auth from "../middlewares/auth.js";
import { createCourse } from "../controllers/coursesController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/create-course", auth, upload.single("image"), createCourse);

export { router as coursesRoutes };
