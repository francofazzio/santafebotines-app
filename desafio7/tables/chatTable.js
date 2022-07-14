const dataMsg = require("../database.js").dataMsg


const createChatTable = async () => {
    try{
        await dataMsg.schema.createTable(`msgs`, chatTable=>{
            chatTable.increments("id").primary();
            chatTable.string("user", 100).notNullable();
            chatTable.string("mensaje", 500).notNullable();
            chatTable.string("tiempo", 200).notNullable();
        })
        console.log("tabla creada")
        dataMsg.destroy()
        
    } catch(err){
        console.log("error al crear chats: ", err);
    }
}

module.exports = createChatTable;