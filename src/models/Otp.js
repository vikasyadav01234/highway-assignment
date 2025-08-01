import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },
});


const OTP = mongoose.models.OTP || mongoose.model("OTP",OtpSchema);

export default OTP;