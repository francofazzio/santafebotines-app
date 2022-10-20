import { CartDAO } from "../DAO/cartDAO.js"
import { mailOptions, transporter } from "../utils/nodemailer.js"

const cartDAO = CartDAO.getInstance()

const registerController = async(req, res) =>{
    
    res.render('plantillaRegister.ejs')
}

const registerPostController = async(req, res) =>{
    try {
        //guardamos en el req.session valores que usaremos
        req.session.user = req.body.username
        req.session.firstName = req.body.firstName
        req.session.lastName = req.body.lastName
        req.session.userId = req.body.userId
        req.session.email = req.user.email
        req.session.phoneNumber = req.body.phoneNumber
        req.session.avatar = req.body.avatar
        req.session.role = req.body.role

        //creamos un carrito para el user 
        const newCartId = await cartDAO.createDocument(req.session.userId)
        req.session.cartId = newCartId

        mailOptions.html = `<h1>Nuevo usuario registrado con los siguientes datos:</h1>
            <p>
                <ul style="color: blue">User: ${req.session.user}</ul>
                <ul style="color: blue">User Id: ${req.session.userId}</ul>
                <ul style="color: blue">First Name: ${req.session.firstName}</ul>
                <ul style="color: blue">Last Name: ${req.session.lastName}</ul>
                <ul style="color: blue">Email: ${req.session.email}</ul>
                <ul style="color: blue">Phone Number: ${req.session.phoneNumber}</ul>
            </p>`
            
            await transporter.sendMail(mailOptions)

        res.redirect("/api/user/login")
        
    } catch (error) {
        console.log(error)
    }
}

const registerErrorController = async(req, res) =>{
    res.render('plantillaRegisterError')
}

export { registerController, registerPostController, registerErrorController }