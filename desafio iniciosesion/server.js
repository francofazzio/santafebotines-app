const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const MongoStore = require("connect-mongo")


const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({mongoUrl: "mongodb+srv://santafebotines:santafebotines2022@cluster0.jsrwue6.mongodb.net/?retryWrites=true&w=majority", 
    mongoStoreOptions
}),
    secret:"coder",
    resave: true,
    saveUninitialized: true,
    cookie :{
        maxAge: 50000
    },
    rolling: true
}))

function auth(req, res, next) {
    if (req.session.admin === true) {
        next();
    } else {
        res.status(401).json({ status: 401, code: "no credentials" })
    }
}

app.use(express.static(path.join(__dirname, "./public")))


app.get("/login",(req , res)=>{
    const {username} = req.query;
    req.session.user = username
    req.session.admin = true;
    res.json({ status: "ok" , user: req.session.user})
})

app.get("/logged", (req, res) => {
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



app.listen(8000 , (req , res)=>{
    console.log(`escuchando puerto 8000`)
})
