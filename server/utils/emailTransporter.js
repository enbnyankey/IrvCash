import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// export const emailTransporter = nodemailer.createTransport({
// host: "smtp.gmail.com",
// port: 465,
// secure: true,
// auth: {
//     type: "OAuth2",
//     user: "user@example.com",
//     accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
// },
// });
export const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE ==="true",
    auth:{
        user: process.env.MAIL_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }

})