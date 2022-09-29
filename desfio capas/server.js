import  express  from "express";
import router from "./routes/UserRoutes.js"
import session from 'express-session';
import { MONGODB , PORT } from "./config/config.js";
import os from 'os';
import cluster from 'cluster';
import mongoose from "mongoose";

const numCPUs = os.cpus().length;


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	session({
		secret: 'coderhouse',
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
		rolling: true,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', "./views")
// app.set('views', new URL('./views', import.meta.url).pathname)
app.set('view engine', 'ejs')

app.use("/", router)


await mongoose.connect(MONGODB)

app.listen( PORT || 3000, ()=>{
    console.log("server prendido")
} )