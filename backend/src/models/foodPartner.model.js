import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    },
    refreshToken:{
        type:String,
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
return await bcrypt.compare(password,this.password);
}

// generating accessAndrefresh token

partnerSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id :this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY  
    }
)
}
partnerSchema.methods.generateRefreshToken = async function(){
   return  jwt.sign({
        _id :this._id,
        email:this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY  
    }
)
}
export const Partner = mongoose.model("Partner",partnerSchema)