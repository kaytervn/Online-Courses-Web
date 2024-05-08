import express from "express";
import multer from "multer";
import auth from "../middlewares/auth.js";
import {} from "../controllers/lessonsController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

export { router as commentsRoutes };
