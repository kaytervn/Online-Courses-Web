import express from "express";

import auth from "../middlewares/auth.js";
import {
  createTopic
} from "../controllers/topicsController.js";

const router = express.Router();


router.post("/create_topic", createTopic);


export { router as topicsRoutes };
