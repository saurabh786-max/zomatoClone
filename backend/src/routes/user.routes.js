import { Router } from "express";
import { loginUser, LogoutUser, registerUser } from "../controllers/user.controler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getFood } from "../controllers/getfood.controller.js";

const userRouter = Router();

userRouter.route("/register").post(
    registerUser
)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT, LogoutUser)

// creating a new protected get api 
userRouter.route("/food").get(verifyJWT,getFood)
export default userRouter