import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential: true
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

// routes
import userRouter from "./routes/user.routes.js";
import partnerRouter from "./routes/partner.routes.js";
import router from "./routes/food.routes.js";

app.use("/api/v1/user",userRouter)
app.use("/api/v1/partner",partnerRouter)
app.use("/api/v1/partner/item",router)
export default app;

