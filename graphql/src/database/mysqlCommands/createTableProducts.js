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
                "title": "Mazo commander 1",
                "price": 100,
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_847134-MLA49546578890_042022-O.webp"
            },
            {
                "title": "Mazo comander 2",
                "price": 200,
                "thumbnail": "https://www.elrincondemagic.com/WebRoot/StoreLES/Shops/64576138/620A/2932/5562/8124/B02B/0A0C/6D0D/296B/Mazo_NEO_Abrochate_Cinturon.png"
            },
            {
                "title": "Mazo comander 3",
                "price": 300,
                "thumbnail": "https://media.magic.wizards.com/en_PaLTnONM9E.png"
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