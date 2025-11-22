import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

},{timestamps:true})

export const Items =  mongoose.model("Item",foodItemSchema);