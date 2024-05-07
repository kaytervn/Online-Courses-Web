import express from "express";
import multer from "multer";
import auth from "../middlewares/auth.js";
import { createCourse , getBestSellerCourse, getNewestCourse} from "../controllers/coursesController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/create-course", auth, upload.single("image"), createCourse);

router.get("/getNewestCourse", getNewestCourse)

router.get("/getBestSellerCourse", getBestSellerCourse)
export { router as coursesRoutes };
