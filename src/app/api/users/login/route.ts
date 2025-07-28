import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";
import OTP from "@/models/Otp"
import jwt from "jsonwebtoken"

connectDb();
export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email,otp} = reqBody;
        console.log(reqBody);

        if(!email||!otp){
            return NextResponse.json({
                error:"All Fields Are Required"
            })
        }
        const user  = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                error:"User Not Exist SignUp first"
            })
        }
        const letestOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(!letestOTP.length||letestOTP[0].otp!==otp){
            return NextResponse.json({messsage:"Invalid or expired OTP"});
        }
        const token = jwt.sign({
            _id:user._id,
            email:user.email
        },process.env.JWT_SECRET!,
        {expiresIn:"7d"})
        return NextResponse.json({
            message:"User Login Success Fully",
            user,
            token,
        });

        


    }
    catch(err:any){
        console.log(err);
        return NextResponse.json({
            err:err.message
        },{status:500});
    }
}