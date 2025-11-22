import { Router } from "express";
import { foodVerifyJWT } from "../middlewares/foodPartnerAuth.middleware.js";
import { foodItems } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(foodVerifyJWT,upload,foodItems)

export default router;