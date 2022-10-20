import { enviroment } from '../config/config.js';
import { createTransport } from "nodemailer";

const transporter = createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: enviroment.NODEMAILER_MAIL,
        pass: enviroment.NODEMAILER_PASS
    }
})

const mailOptions = {
    from: "Server Node.js",
    to: enviroment.ADMIN_MAIL,
    subject: "New user registed! :)",
    html: ""
}


export { transporter, mailOptions }