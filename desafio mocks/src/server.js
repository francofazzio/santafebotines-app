const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Servisdor conectado pueto 8080') })
const io = new IOServer(expressServer)
const router = require('../routes/indexrouts.js')
const {schema,normalize} = require('normalizr')
const util = require ('util')

function print(objeto)
{
    console.log(util.inspect(objeto,false,12,true))
}


let ProductosDB = []
let messagesArray = []
fs.writeFileSync(`Messages/appMensajes.txt`,'')
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

io.on('connection', async socket => {
   
    socket.on('client:product', async productInfo => {
        ProductosDB= productInfo
        
        io.emit('server:productos', ProductosDB)
            
    })
    socket.emit('server:productos', ProductosDB)
        //Socket Mensajes
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
       
        io.emit('server:mensajes', nomalizePost)
            
    })
})