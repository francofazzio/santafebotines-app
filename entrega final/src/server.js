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
import { User } from './models/userModel.js';
import { registerStrategy, loginStrategy } from './utils/strategies.js';
import mongoose from 'mongoose';
import { enviroment } from './config/config.js';
import yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';
import logger from './utils/logger.js';


const cpus = os.cpus()

const yargsOptions = yargs(process.argv.slice(2))
const chatDAO = ChatDAO.getInstance()

const args = yargsOptions.alias({
  p: "port",
  m: "mode"
}).default({
  mode: "fork"
}).argv

logger.info("Modo de inicio de servidor:", args.m)
logger.info("PUERTO por ARGS",args.p)

const app = express()
const PORT = process.env.PORT || args.port
enviroment.PORT = args.port
console.log("PORT DESDE SERVER.js", enviroment.PORT)
const isCluster= args.m == 'cluster'

if(isCluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork()
  })
  cluster.on("exit", (worker) => {
    logger.info(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  
 
  const bbdd = await mongoose.connect(enviroment.STRING_CONNECTION_MONGO).then(logger.info("Conectado a la base Mongo"))
  args.bbddName = bbdd.connections[0].name
  
 
  const expressServer = app.listen(PORT, () => logger.info(`Servidor escuchando en el puerto ${PORT}`))
  args.expressServer = expressServer
  
  
  const __dirname = dirname(fileURLToPath(import.meta.url))
  app.use(express.static(path.join(__dirname,'./views')))
  app.use(express.static("upload"))
  

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
        maxAge: 600000,
      },
    })
  )

  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression())
  
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });


  app.use((req, res, next) => {
    req.args = args
    next()
  })
  

  const io = new Server(expressServer)
  
 
  io.on('connection', async socket =>  {
    console.log(`Se conecto el cliente con id: ${socket.id}`)


    const messagesFromMongo = await chatDAO.getAll()
    const normalizedChat = normalizedMessages(messagesFromMongo)

    
    socket.emit('server:mensajes', normalizedChat)

    //Evento de nuevo mensaje
    socket.on('client:message', async (messageInfo) => {
        await chatDAO.postMessage(messageInfo)

        
        const messagesFromMongo = await chatDAO.getAll()
        const normalizedChat = normalizedMessages(messagesFromMongo)
        io.emit('server:mensajes', normalizedChat)
    })
})

  //middleware logger para metodos y url
  app.use( (req, res, next) => {
    logger.info(`Peticion a ruta ${req.url} con metodo ${req.method} recibida.`)
    next()
  })

  app.use('/api', routes)
}