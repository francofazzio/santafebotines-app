import { CartDAO } from '../DAO/cartDAO.js'
import { UserDAO } from '../DAO/userDAO.js'
import { User } from '../models/userModel.js'

const cartDAO = CartDAO.getInstance()
const userDAO = UserDAO.getInstance()

const loginController = async (req, res) => {
    if(req.isAuthenticated()){
        console.log("user ya logeado")
        res.redirect("/api/products/all")
    } else { 
        console.log("user no logeado, por favor ingrese credenciales")
        res.render("plantillaLogin.ejs")
    }
    
}

const loginPostController = async (req, res) => {
    req.session.user = req.body.username

    
    const loggedUser = await userDAO.findOne(req.session.user)
    req.session.email = loggedUser.email
    req.session.userId = loggedUser._id
    req.session.phoneNumber = loggedUser.phoneNumber
    req.session.avatar = loggedUser.avatar
    req.session.role = loggedUser.role


    const loggedUserCart = await cartDAO.getByUserId(req.session.userId)
    req.session.cartId = loggedUserCart._id

    res.redirect("/api/products/all")
}

const logOutController = async (req, res) => {
    req.session.destroy()

    res.render("plantillaDeslogeo.ejs")
}

const loginErrorController = async (req, res) => {
    res.render('plantillaLoginError')
}

export { loginController, loginPostController, logOutController, loginErrorController }