import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENVIROMENT = process.env.NODE_ENV || 'dev';
const MONGODB = process.env.MONGODB || 'mongodb://localhost:27017/ecommerce';
const MAIL_RECEIVER = 'francofazzio14@gmail.com';
const ADMIN_NUMBER = process.env.ADMIN_NUMBER;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const CLUSTER = process.env.CLUSTER || true;


export {
    PORT,
    ENVIROMENT,
    MONGODB,
    MAIL_RECEIVER,
    CLUSTER,
    TWILIO_SID,
    TWILIO_TOKEN,
    ADMIN_NUMBER,
};