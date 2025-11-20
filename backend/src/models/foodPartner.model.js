import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const partnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

partnerSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next()
})

partnerSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(this.password,password);
}

// generating accessAndrefresh token

partnerSchema.methods.generateAccessToken = async function(){

}
export const Partner = mongoose.model("Partner",partnerSchema)