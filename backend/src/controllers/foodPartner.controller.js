import { Partner } from "../models/foodPartner.model.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const generateAccessTokenAndRefeshToken =   async (userId)=>{
    try{
        const partner = await Partner.findById(userId);
        const accessToken = await partner.generateAccessToken();
        const refreshToken = await partner.generateRefreshToken();

        partner.save({
            validateBeforeSave:false
        })
        return {accessToken,refreshToken}
    }
    catch(error){
        console.log("something went wrong in token generation",error);
    }
}
const registerfoodPartner = asyncHandler(async(req,res)=>{
    const{name,email,password}= req.body;

    const AlreadyExist = await Partner.findOne({email})
    if(AlreadyExist){
        throw new apiError("401","account already exists !")
    }
    
    const partner = Partner.create({
        name,
        email,
        password
    })

    const createdPartner = await Partner.findById(partner._id).select(
        "-password "
    )

    return res.status(200)
    .json(
        new apiResponse(200,createdPartner,"partner created successfully")
    )
    
})

const loginFoodPartner = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    
    const partner = await Partner.findOne({email})
    if(!partner){
        throw new apiError(401,"no user found with this email!!! ");
    }

    const isPasswordValid = await partner.isPasswordCorrect(password);
 if(!isPasswordValid){
    throw new apiError(402,"invalid partner credentials ")
 }

 const{accessToken,refreshToken}= await generateAccessTokenAndRefeshToken(partner._id);

 const options ={
    httpOnly : true,
 }
  return res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(
    new apiResponse(200,{},"user logedIN successfully !!")
 )


})

const logoutFoodPartner = asyncHandler(async (req,res)=>{

    await Partner.findByIdAndUpdate(req.partner._id,{
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
) 
    const options = {
        httpOnly:true
    }
    res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(201,"Partner logedOut successfully !!")
    )
})

export{registerfoodPartner,loginFoodPartner,logoutFoodPartner}