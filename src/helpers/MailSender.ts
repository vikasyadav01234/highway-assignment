import nodemailer from 'nodemailer';

const mailSender = async (email:any,title:any,body:any) =>{
    try{
        const transpoeter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                 rejectUnauthorized: false,
            },
            secure: false,
        });
        const info = await transpoeter.sendMail({
            from:`<${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        return info;
    }catch(err:any){
        console.log(err.message);
        return err.message;
    }
}

export default mailSender;