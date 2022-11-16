import express from 'express'
import routes from './router/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { Server } from 'socket.io'
import { ChatDAO } from './DAO/chatDAO.js';
import { normalizedMessages } from './utils/normalize.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { User } from './models/userModel.js';

import mongoose from 'mongoose';
import { hashPassword, isValidPassword } from './utils/bcryptPasswords.js'
import { enviroment } from './config/config.js';
import yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';

const cpus = os.cpus()

const yargsOptions = yargs(process.argv.slice(2))
const chatDAO = ChatDAO.getInstance()

const args = yargsOptions.alias({
  p: "port",
  m: "mode"
}).default({
  port: 8080,
  mode: "fork"
}).argv

console.log("Modo de inicio de servidor:", args.m)
console.log("PUERTO por ARGS",args.p)

const app = express()
const PORT = args.port
const isCluster= args.m == 'cluster'

if(isCluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork()
  })
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  

  await mongoose.connect(enviroment.STRING_CONNECTION_MONGO).then(console.log("Conectado a la base Mongo"))
  
  const expressServer = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  
  const io = new Server(expressServer)
  
  const __dirname = dirname(fileURLToPath(import.meta.url))
  app.use(express.static(path.join(__dirname,'./views')));
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  
  app.set('views', path.join(__dirname, './views'))
  app.set('view engine', 'ejs')
  

  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          enviroment.STRING_CONNECTION_MONGO,
        mongoOptions,
      }),
      secret: enviroment.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly : false,
        secure : false,
        maxAge: 120000,
      },
    })
  )
  
  
  
  app.use(passport.initialize());
  app.use(passport.session());

   
    app.use((req, res, next) => {
      req.args = args
      next()
    })
  

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
                email: req.body.email
            }
            console.log("Nuevo usuario creado: ",newUser)
  
            const createdUser = await User.create(newUser)
            done(null, createdUser)
  
        } catch (error) {
            console.log("Error registrando usuario", error)
            done("Error en registro", null)
        }
    }
  )
  
  
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
  
  
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });
  
  
  io.on('connection', async socket =>  {
      console.log(`Se conecto el cliente con id: ${socket.id}`)
      
      const messagesFromMongo = await chatDAO.getAll()
      const normalizedChat = normalizedMessages(messagesFromMongo)
  
     
      socket.emit('server:mensajes', normalizedChat)
  
  
      socket.on('client:message', async (messageInfo) => {
          await chatDAO.postMessage(messageInfo)
  
         
          const messagesFromMongo = await chatDAO.getAll()
          const normalizedChat = normalizedMessages(messagesFromMongo)
          io.emit('server:mensajes', normalizedChat)
      })
  })
  
  app.use('/api2', routes)

}