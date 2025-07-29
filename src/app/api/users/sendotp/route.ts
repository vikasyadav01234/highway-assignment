import OTP from "@/models/Otp";
import { sendOTPToEmail } from "@/helpers/sendOtp";
import { NextRequest, NextResponse } from "next/server";
import {connectDb} from '@/dbConfig/dbConfig'

export async function POST(request:NextRequest){
    await connectDb();
    try{
        const reqBody = await request.json();
        const {email} = reqBody;
        if(!email){
            return NextResponse.json({
                message:"Email is required"
            });
        }
        await sendOTPToEmail(email);
        return NextResponse.json({
            message:"OTP sent SuccessFully"
        });
    }catch(err){
        console.log(err);
        return NextResponse.json({
            error:err
        })
    }
}