import { Partner } from "../models/foodPartner.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken"

export const foodVerifyJWT = asyncHandler(async (req,res,next)=>{
    try{
        const token = req.cookies?.accessToken|| req.header("authorization")?.replace("Bearer ","");
        if(!token){
            throw new apiError(401,"unathorised request")
        }
        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const partner = await Partner.findById(decodedToken._id).select("-password")
        if(!partner){
            throw new apiError(401,"Invalid access token !")
        }
        req.partner = partner;
        next();
    }
    catch(error){
        throw new apiError(401,"invalid acces token !!",error);
    }
})