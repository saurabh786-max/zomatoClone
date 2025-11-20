import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateAccessTokenAndRefeshToken = async(userId)=>{
    try{
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refeshToken = await user.generateRefreshToken();
        user.refreshToken = refeshToken;
        await user.save({validateBeforeSave:false})
        return {accessToken,refeshToken}
    }
    catch(error){
        throw new apiError(500,"something went wrong in tokenGeneration function!!")
    }
}

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
// 1.take data from req.body 

    const{userName,password} = req.body

    if(!userName){
        throw new apiError(402,"username not given")
    }
    // 2. search for user in the db

    const user = await User.findOne({userName})

    if(!user){
        throw new apiError(400,"user does'nt exist")
    }

    //3.if user is found check his password

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new apiError(401,"invalid user credentials ")
    }

// 4. if user passwrod is correct, we have to generate access token and refreshtoken for the user
const{accessToken,refeshToken} = await generateAccessTokenAndRefeshToken(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httpOnly: true,
}

// 5. returing response to the user 
return res.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refeshToken,options)
.json(
    new apiResponse(200,{
        user:loggedInUser,accessToken,refeshToken
    },
"user loggedIn Successfully !!")
)
})

const LogoutUser = asyncHandler(async (req,res)=>{
    // 1.clear refresh token from cookies for the user, to clear cookies we have to use findByIdAndUpdate 
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
)
const options ={
    httpOnly: true,
    secure:true
}

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(200,{},"user loged out successfully"))
})

export{registerUser,loginUser,LogoutUser}