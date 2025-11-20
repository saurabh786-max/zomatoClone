import { Router } from "express";
import { loginUser, LogoutUser, registerUser } from "../controllers/user.controler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
    registerUser
)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT, LogoutUser)
export default userRouter