import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const foodItems = asyncHandler(async (req,res)=>{
    // const{vedio,name,description,foodPartner} = req.body;
    res.status(200)
    .json(new apiResponse(
        200,"food item added"
    ))
})

export{foodItems}