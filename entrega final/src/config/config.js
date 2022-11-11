import dotenv from "dotenv"
dotenv.config()

export const enviroment = {
    STRING_CONNECTION_MONGO: process.env.STRING_CONNECTION_MONGO || '',
    SECRET_SESSION: process.env.SECRET_SESSION || '',
    NODEMAILER_MAIL: process.env.NODEMAILER_MAIL || '',
    NODEMAILER_PASS: process.env.NODEMAILER_PASS || '',
    ADMIN_MAIL: process.env.ADMIN_MAIL || '',
    ACCOUNTSID: process.env.ACCOUNTSID || '',
    AUTHTOKEN_TWILIO: process.env.AUTHTOKEN_TWILIO || '',
    ADMIN_WHATSAPP_NUMBER: process.env.ADMIN_WHATSAPP_NUMBER || '',
    ADMIN_SMS_NUMBER: process.env.ADMIN_SMS_NUMBER || '',
    TWILIO_WHATSAPP_SANDBOX: process.env.TWILIO_WHATSAPP_SANDBOX || ''
}