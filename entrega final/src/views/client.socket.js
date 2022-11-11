const socket = io()


let date = new Date()


const newProductForm = document.getElementById('newProductForm')
const titleInput = document.getElementById('titleInput')
const priceInput = document.getElementById('priceInput')
const thumbnailInput = document.getElementById('thumbnailInput')


const messageForm = document.getElementById('messageForm')
const emailInput = document.getElementById('emailInput')
const nameInput = document.getElementById('nameInput')
const lastNameInput = document.getElementById('lastNameInput')
const ageInput = document.getElementById('ageInput')
const aliasInput = document.getElementById('aliasInput')
const avatarInput = document.getElementById('avatarInput')
const messageInput = document.getElementById('messageInput')
const messagesPool = document.getElementById('messagesPool')


const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo)
}

const renderMessage = (messageInfo) => {
 
    const author = new normalizr.schema.Entity("author", {}, { idAttribute: "userEmail" })
    const message = new normalizr.schema.Entity("message", { author: author }, { idAttribute: "_id" })
    const schemaMessages = new normalizr.schema.Entity("messages", { messages:[message] })
    
    
    const denormalizedMessages = normalizr.denormalize(messageInfo.result, schemaMessages, messageInfo.entities )
   
    const html = denormalizedMessages.messages.map( msgInfo => {
        return(`<div>
                    <strong style="color: blue">${msgInfo._doc.author.alias}</strong>
                    <br>
                    <img src="${msgInfo._doc.author.avatar}" alt="">
                    <br>
                    <em style="color:green">${msgInfo._doc.message}</em>
                    <br>    
                    <br>    
                    <br>    
            </div>`)
    }).join(" ")
    messagesPool.innerHTML = html
}

const submitChatHandler = (event) => {
    event.preventDefault()

    let fyh = date.getDate() + '/'+ (date.getMonth()+1) + '/'+ date.getFullYear() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    const messageInfo = {
        author: {
            userEmail: emailInput.value,
            name: nameInput.value,
            lastName: lastNameInput.value,
            age: ageInput.value,
            alias: aliasInput.value+" "+`[${fyh}]`,
            avatar: avatarInput.value,
        },
        message: messageInput.value
    }

    sendMessage(messageInfo)
}

socket.on('server:mensajes', renderMessage)

messageForm.addEventListener('submit', submitChatHandler)