import mailSender from "@/helpers/MailSender";
import otpGenerator from "otp-generator";
import OTP from "@/models/Otp";
import otpTemplate from "./Mail/OtpEmailTemplate";

export const sendOTPToEmail= async (email:String):Promise<void>=>{
    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    let existingOTP = await OTP.findOne({otp});
    while(existingOTP){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        existingOTP = await OTP.findOne({otp});
    }
    await OTP.create({email,otp});
    await mailSender(email,"Verification Email", otpTemplate(otp));
}