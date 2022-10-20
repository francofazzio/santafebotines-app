import { enviroment } from '../config/config.js';
import twilio from "twilio";

const whatsappClient = twilio(enviroment.ACCOUNTSID, enviroment.AUTHTOKEN_TWILIO)

const whatsappOptions = {
    body: "",
    from: `whatsapp:${enviroment.TWILIO_WHATSAPP_SANDBOX}`,
    to: `whatsapp:${enviroment.ADMIN_WHATSAPP_NUMBER}`
}

export { whatsappClient, whatsappOptions }