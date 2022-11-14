import { Strategy as LocalStrategy } from "passport-local";
import { User } from '../models/userModel.js'
import { hashPassword, isValidPassword } from './bcryptPasswords.js'
import { enviroment } from "../config/config.js";


// Estrategia de registro
const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const existingUser = await User.findOne({ username })
  
            if(existingUser){
                return done(null, null)
            }
  
            const newUser = {
                username,
                password: hashPassword(password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber ,
                avatar: `http://localhost:${enviroment.PORT}/${req.file.filename}`,
                role: 'user'
            }
            const createdUser = await User.create(newUser)
            
            req.body.userId = createdUser._id
            req.body.avatar = createdUser.avatar
            req.body.phoneNumber = createdUser.phoneNumber
            req.body.role = createdUser.role
            
            console.log("Nuevo usuario creado: ",newUser)
            done(null, createdUser)
  
        } catch (error) {
            console.log("Error registrando usuario", error)
            done("Error en registro", null)
        }
    }
  )
  
  // Estrategia de logeo
  const loginStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if(!user || !isValidPassword(password, user.password)){
                return done(null, null)
            }
            done(null, user)
            
        } catch (error) {
            console.log("Error login", err);
            done("Error login", null);
        }
    }
  )

export { registerStrategy, loginStrategy }