import { Router } from "express";
import { foodVerifyJWT } from "../middlewares/foodPartnerAuth.middleware.js";
import { foodItems } from "../controllers/food.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// routes/food.routes.js
router.post("/", foodVerifyJWT, upload.single("video"), foodItems);


export default router;