import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running at the port :${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB CONNECTION ERROR!!", error)
})