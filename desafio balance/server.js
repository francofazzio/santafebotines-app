const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const MongoStore = require("connect-mongo")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("./models")
const controllersdb = require("./controllersdb")




const app = express()

const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true };


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(
    session({
//     store: MongoStore.create({mongoUrl: "mongodb+srv://facundocasal:facu123@cluster0.jsrwue6.mongodb.net/?retryWrites=true&w=majority", 
//     mongoStoreOptions
// }),
    secret:"coder",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie :{
        httpOnly: false,
        maxAge: 50000,
        secure: false
    },
}))


app.use(passport.initialize())
app.use(passport.session())



const sinUpStrategy = new localStrategy({
  passReqToCallback: true},
   async (req , username , password, done)=>{
    const existingUser = await User.findOne({username})
    if(existingUser){
        return done ("usuario Existente", null)
    }
  })






function auth(req, res, next) {
    if (req.session.admin === true) {
        next();
    } else {
        res.status(401).json({ status: 401, code: "no credentials" })
    }
}

app.use(express.static(path.join(__dirname, "./public")))


app.get("/login",(req , res)=>{
    const {username, password} = req.query;
    req.session.user = {username, password}

    req.session.admin = true;
    res.json({ status: "ok" , user: req.session.user})
})

app.route("/logged").all(auth).get( (req, res) => {
    if (req.session.admin === true) {
        res.json({ status: "ok", user: req.session.user })
    } else {
        res.status(401).json({ status: 401, code: "no credentials" })
    }
})

app.get("/logout", (req, res) => {
    const user = req.session.user;
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ status: "error", body: err })
        } else {
            res.json({ status: "ok", user })
        }
    })
})

app.route("/register")
.get((req , res)=>{
    res.sendFile(path.join(__dirname, "./public/registrer.html"))
}).post("/register", (req,res) =>{
    const {userName , password} = req.body
    res.redirect("/")
})


res,json({error: true , menssage: "invalid Credential"})

app.listen(8000 , (req , res)=>{
    console.log(`escuchando puerto 8000`)
})