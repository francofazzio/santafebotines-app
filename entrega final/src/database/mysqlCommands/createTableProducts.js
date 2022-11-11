const database = require('../databaseMysql.js')

const createTableInsertProducts = async () => {
    try {
        await database.schema.dropTableIfExists('products')

        await database.schema.createTable('products', table =>{
            table.increments('id').primary()
            table.string('title', 150).notNullable()
            table.string('price', 50).notNullable()
            table.string('thumbnail', 150).notNullable()
        })
        console.log("Products table Created")

        const products = [
            {
                "title": "Botines Nike Legend 9 Club FG De Niños",
                "price": 20000,
                "thumbnail": "https://sporting.vtexassets.com/arquivos/ids/593856-800-800?v=637952342559000000&width=800&height=800&aspect=true"
            },
            {
                "title": "Botines Puma Future Z 3.4 Fg/Ag",
                "price": 26000,
                "thumbnail": "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwc58d7cd5/products/PU_107148-01/PU_107148-01-1.JPG"
            },
            {
                "title": "Botines Puma Tacto II Fg/Ag",
                "price": 14000,
                "thumbnail": "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwea70d875/products/PU_106966-02/PU_106966-02-1.JPG"
            }
        ]

        await database('products').insert(products)

        console.log('products inserted!')

        database.destroy()

    } catch (error) {
        console.log(error)
    }
}

createTableInsertProducts()