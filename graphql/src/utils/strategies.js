import { Strategy as LocalStrategy } from "passport-local";
// import mongoose from "mongoose";
import { User } from '../models/userModel.js'
import { hashPassword, isValidPassword } from './bcryptPasswords.js'

// await mongoose.connect('mongodb+srv://lucas:lucas1234@cluster0.oxbotfj.mongodb.net/?retryWrites=true&w=majority').then(console.log("Conectado a la base Mongo"))

// Estrategia de registro
const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, email, password, done) => {
        try {
            console.log("CONSOLE LOG DESDE ESTRATEGIA")
            const existingUser = await User.findOne({ email })

            if(existingUser){
                return done(null, null)
            }

            const newUser = {
                email: email,
                password: hashPassword(password),
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
            console.log("++++++++++++++++++NEWUSER",newUser)
            const createdUser = await User.create(newUser)
            done(null, createdUser)

        } catch (error) {
            console.log("Error registrando usuario", error)
            done("Error en registro", null)
        }
    }
)

// Estrategia de logeo
const loginStrategy = new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            console.log("------------------------USER", user)
            if(!user || !isValidPassword(password, user.password)){
                return done(null, null)
            }

        } catch (error) {
            console.log("Error login", err);
            done("Error login", null);
        }
    }
)

export { registerStrategy, loginStrategy }