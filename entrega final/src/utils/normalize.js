import { normalize, schema, denormalize } from "normalizr";


const normalizedMessages = (messages) => {
    const author = new schema.Entity("author", {}, { idAttribute: "userEmail" })
    const message = new schema.Entity("message", { author: author }, { idAttribute: "_id" })
    const schemaMessages = new schema.Entity("messages", { messages:[message] })
    
    const normalizedChat = normalize({ id: "messages", messages }, schemaMessages)

    return normalizedChat
}

export { normalizedMessages }