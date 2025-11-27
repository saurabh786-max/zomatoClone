import { Items } from "../models/foodItem.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/imagekit.js";
import {v4 as uuid} from "uuid"
 

const foodItems = asyncHandler(async (req,res)=>{
    const{name,description,foodPartner} = req.body;
    if (!req.file || !req.file.buffer) {
      // Throw your custom API error if the file is missing or empty
      throw new apiError(400, "File is missing or failed to process by middleware."); 
  }
  const fileUploadResult = await uploadFile(req.file.buffer,uuid())

console.log(fileUploadResult);
const foodItems = await Items.create({
  name:req.body.name,
  description:req.body.description,
  video: fileUploadResult.url,
  foodpartner:req.partner._id

})
return res.status(201).json(
  new apiResponse (201,"food itemcreated successgfully !!",foodItems)
);


})

export{foodItems}