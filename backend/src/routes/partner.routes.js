import { Router } from "express"
import { loginFoodPartner, logoutFoodPartner, registerfoodPartner } from "../controllers/foodPartner.controller.js";
import { foodVerifyJWT } from "../middlewares/foodPartnerAuth.middleware.js";
const partnerRouter = Router();
partnerRouter.route("/register").post(registerfoodPartner)
partnerRouter.route("/login").post(loginFoodPartner)
partnerRouter.route("/logout").post(foodVerifyJWT,logoutFoodPartner)

export default partnerRouter