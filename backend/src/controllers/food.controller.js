import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/imagekit.js";
import {v4 as uuid} from "uuid"
 

const foodItems = asyncHandler(async (req,res)=>{
    const{name,description,foodPartner} = req.body;
    console.log("req.headers:", req.headers);
    console.log("req.file:", req.file);
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    if (!req.file || !req.file.buffer) {
      // Throw your custom API error if the file is missing or empty
      throw new apiError(400, "File is missing or failed to process by middleware."); 
  }
    // const fileNameforUpload = req.file.originalname;
    // controllers/food.controller.js (key bits)
  const fileUploadResult = await uploadFile(req.file.buffer,uuid())

console.log(fileUploadResult);
// const videoUrl = uploadResult?.secure_url || uploadResult?.url;
// temporarily replace the last line in your controller with:
return res.status(201).json({
  success: true,
  uploaded: fileUploadResult,
  item: { name, description, foodPartner }
});


})

export{foodItems}