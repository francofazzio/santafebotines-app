const express = require("express")
const { Server: IOServer } = require("socket.io")
const app = express()
const path = require("path")
const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)
const  ContenedorProduct  = require("./contenedorSql.js")
const ContenedorChat = require("./contenedorSqlChat.js")
const {dataMsg , dataProduct}  = require("./database")
const createChatTable = require("./tables/chatTable")
const createTableProduct = require("./tables/productTable")


app.use(express.static( path.join(__dirname , './public')))

const productosList = new ContenedorProduct(dataProduct, "productos", createTableProduct);
const messageLog = new ContenedorChat( dataMsg , "msgs" , createChatTable);


io.on('connection', async socket => {
    console.log(`se conecto el cliente id : ${socket.id}`)

    let mensajes = await messageLog.getAll()
    socket.emit("server:mensajes", mensajes)
    socket.on("mensaje:cliente", async messageInfo => {
        await messageLog.save(messageInfo)
        mensajes = await  messageLog.getAll()
        io.emit('server:mensajes',  mensajes)        
    })


    let listaProductos = await productosList.getAll();
    socket.emit("producto:server", listaProductos)
    socket.on("producto:cliente", async productInfo => {
        await productosList.save(productInfo)
         
        listaProductos = await productosList.getAll();
        io.emit("producto:server", listaProductos)         
    })
})