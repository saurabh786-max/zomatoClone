import { Router } from "express";
import { foodVerifyJWT } from "../middlewares/foodPartnerAuth.middleware.js";
import { foodItems } from "../controllers/food.controller.js";
import multer from "multer";

const upload = multer({
    storage:multer.memoryStorage(),
})

const router = Router();

router.route("/").post(foodVerifyJWT,upload.single("vedio"),foodItems)

export default router;