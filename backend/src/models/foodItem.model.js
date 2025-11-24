import mongoose, { model } from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    ,foodpartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }

},{timestamps:true})

export const Items =  mongoose.model("Item",foodItemSchema);