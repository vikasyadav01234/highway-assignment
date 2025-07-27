import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim:true
        },
        DOB:{
            type:Date,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        otp:{
            type:String,
        }
    },{timestamps:true}
)

const User = mongoose.model("User",UserSchema)

export default User;