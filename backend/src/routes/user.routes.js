import { Router } from "express";
import { registerUser } from "../controllers/user.controler.js";

const userRouter = Router();

userRouter.route("/register").post(
    registerUser
)

export default userRouter