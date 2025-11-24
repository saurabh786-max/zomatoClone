import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const foodItems = asyncHandler(async (req,res)=>{
    const{vedio,name,description,foodPartner} = req.body;
    const vediolocalPath = req.files?.vedio[0]?.path
    const file = uploadOnCloudinary(vediolocalPath);
    res.status(200)
    .json(new apiResponse(
        200,"food item added" 
    ))
console.log(req.body);
console.log(req.files);
})

export{foodItems}