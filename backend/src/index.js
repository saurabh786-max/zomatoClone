import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running at the port :${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB CONNECTION ERROR!!", error)
})
// src/index.js

console.log("ImageKit Private Key Loaded:", !!process.env.IMAGEKIT_PRIVATE_KEY);
// console.log("Value:", process.env.IMAGEKIT_PRIVATE_KEY); // For advanced debugging

// The above MUST print: "ImageKit Private Key Loaded: true" 
// If it prints 'false', the .env file is not being found.

// ... rest of your imports and setup (e.g., connectDB, app.listen)