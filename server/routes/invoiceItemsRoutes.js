import express from "express";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/my_list_course", auth, getMyListCourse);

router.get("/my_course/searchByName", auth, searchByName);

router.get("/my_course/searchByCategory", auth, searchByCategory);

router.get("/my_course/searchByTimeUpdate", auth, searchByTimeUpdate);


router.post("/review_course", auth, reviewCourse);
export { router as invoiceItemsRoutes };