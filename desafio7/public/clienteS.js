const socket = io()


const nombreProduct = document.getElementById("nombreProduct")
const priceProduct = document.getElementById("priceProduct")
const imgProduct = document.getElementById("imgProduct")
const listaProductos = document.getElementById("listaProductos")
const cargarProducto = document.getElementById("cargarProducto")




const userEmail  = document.getElementById("userEmail")
const userMensaje = document.getElementById("userMensaje")
const enviarMensaje = document.getElementById("enviarMensaje")
const chat = document.getElementById("chat")


function sendProduct (e) {
    e.preventDefault()
    let product = {
        name : nombreProduct.value,
        price : Number(priceProduct.value),
        img : imgProduct.value,
    }
    socket.emit("producto:cliente", product)    

    nombreProduct.value = " "
    priceProduct.value = " "
    imgProduct.value = " "
}

function sendMsj (e) {
        e.preventDefault()
        let msj = {
            user : userEmail.value,
            mensaje : userMensaje.value,
            tiempo : new Date().toLocaleString(),
        }
        socket.emit("mensaje:cliente", msj)
        userEmail.value = " "
        userMensaje.value = " "
}

async function renderProducts(products) {
    const response = await fetch('./tabla.ejs')
    .then(res => res.text()).then(plantilla => {
        products.map(e => {
            const html = ejs.render(plantilla, e)
            listaProductos.innerHTML += html
        });
    }) 
}

function renderMessage(messageArray) {
    const html = messageArray.map(messageInfo => {
        return(`<div class="msgContainer">
        <span class="text-primary fw-bold">${messageInfo.user}</span>
        [<span class="text-danger">${messageInfo.tiempo}</span>] :
        <span class="text-success fst-italic">${messageInfo.mensaje}</span>
        </div>`)
    }).join(" ");
    chat.innerHTML = html;
}

socket.on('server:mensajes', infoMensaje =>{
    renderMessage(infoMensaje)
})

socket.on("producto:server", products => {
    renderProducts(products)
})

enviarMensaje.addEventListener("submit",sendMsj)
cargarProducto.addEventListener("submit",sendProduct)