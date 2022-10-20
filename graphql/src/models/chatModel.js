import mongoose from "mongoose"


const chatSchema = new mongoose.Schema({
    author:{
        userEmail: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    message: { type: String, required: true, }
})

const Chat = mongoose.model('messages', chatSchema)

export { Chat }