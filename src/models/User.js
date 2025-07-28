import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim:true
        },
        dob:{
            type:Date,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        active:{
            type:Boolean,
            default:false,
        },
        token:{
            type:String
        }
    },{timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User",UserSchema)

export default User;