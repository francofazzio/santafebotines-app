import express from 'express'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs"
import { Server } from "socket.io";
const app = express()
const expressServer = app.listen(8080, () => { console.log('Servisdor conectado puerto 8080') })
const io = new Server(expressServer);
import router from '../routes/indexrouts.js';
import { schema, normalize } from 'normalizr';
import util from 'util';

import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"

function print(objeto)
{
    console.log(util.inspect(objeto,false,12,true))
}


let ProductosDB = []
let messagesArray = []
fs.writeFileSync(`Messages/appMensajes.txt`,'')
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology:true}
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({mongoUrl:'mongodb+srv://saymon:saymon123456@cluster0.pxiaw.mongodb.net/?retryWrites=true&w=majority',mongoOptions}),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:20000
    }
}))
io.on('connection', async socket => {
   
    socket.on('client:product', async productInfo => {
        ProductosDB= productInfo
       
        io.emit('server:productos', ProductosDB)
            
    })
    socket.emit('server:productos', ProductosDB)
       
    socket.emit('server:mensajes', messagesArray)
    socket.on('client:menssage', async messageInfo => {
        let MensajesExistentesFile = await fs.promises.readFile(`Messages/appMensajes.txt`)
        
        if(MensajesExistentesFile != '')
        {
            messagesArray = JSON.parse(MensajesExistentesFile)
        }
        messageInfo.id = messagesArray.length+1
        messagesArray.push(messageInfo)
        
        await fs.promises.writeFile(`Messages/appMensajes.txt`,JSON.stringify(messagesArray))
        
        const author = new schema.Entity('author',{},{idAtrribute:'id'})
        const mensaje = new schema.Entity('mensaje',{author: author},{idAtrribute:"id"})
        const schemamensajes = new schema.Entity('mensajes',{
            mensajes:[mensaje]
        },{idAtrribute:"id"})

        const nomalizePost = normalize({id:'mensajes',mensajes:messagesArray},schemamensajes)
        //console.log(messagesArray)
        //print(nomalizePost)
        io.emit('server:mensajes', nomalizePost)
            
    })
})