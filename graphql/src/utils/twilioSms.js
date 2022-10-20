import { enviroment } from '../config/config.js';
import twilio from "twilio";

const smsClient = twilio(enviroment.ACCOUNTSID, enviroment.AUTHTOKEN_TWILIO)

const smsOptions = {
    body: "",
    from: enviroment.ADMIN_SMS_NUMBER,
    to: ""
}

export { smsClient, smsOptions }