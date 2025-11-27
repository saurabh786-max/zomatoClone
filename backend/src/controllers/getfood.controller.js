import { Items } from "../models/foodItem.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getFood = asyncHandler(async (req,res)=>{
    const foodItems = await Items.find({})
    res.status(201).json(
        new apiResponse(201,"food Items fetched successfully !",foodItems)
    )
})

export{getFood}