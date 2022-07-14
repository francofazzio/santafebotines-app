class ContenedorChat {
    constructor(database, nameTable) {
        this.database = database
        this.nameTable = nameTable
    }
    async save(obj) {
        try {
            await this.database(this.nameTable).insert(obj)
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }


    async getAll() {
        try {
            const data = await this.database.from(this.nameTable).select("*")
            console.log(data)
            return data
        } catch (err) {
            if (err) {
                const createTable = require("./tables/chatTable.js")
                await createTable()
            } else{
             console.log(`hubo un error al recuperar la base ${this.nameTable} : ${err}`)}
        }
    }
}

module.exports = ContenedorChat