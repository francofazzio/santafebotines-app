class ContenedorProduct {
    constructor(config, nameTable , createTable) {
        this.config = config
        this.nameTable = nameTable
        this.createTable = createTable
    }
    async save(obj) {
        try {
            await this.config(`${this.nameTable}`).insert(obj)
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }


    async getAll() {
        try {
            const data = await this.config.from(`${this.nameTable}`).select("*")
            return data
        } catch (err) {
            if (err.code == "ER_BAD_DB_ERROR") {
                this.createTable()
            } else{
             console.log(`hubo un error al recuperar la base ${this.nameTable} : ${err}`)}
        }
    }
}

module.exports = ContenedorProduct