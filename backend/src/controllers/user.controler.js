import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{

    const{userName,email,password,fullName} = req.body;
    
    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(existedUser){
        throw new apiError(409,"user with email or userName is already existed")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        userName:userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201).json(
        new apiResponse(200,createdUser,"user registered successfully !!")
    )
})


const loginUser = asyncHandler(async (req,res)=>{

})

export{registerUser}