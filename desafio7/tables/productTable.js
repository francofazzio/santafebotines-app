const dataProduct = require("../database").dataProduct


const createTableProduct  = async () =>{

    try{
        await dataProduct.schema.createTable("productos", tableProductos=>{
            tableProductos.increments("id").primary()
            tableProductos.string("name",50).notNullable()
            tableProductos.float('price').notNullable()
            tableProductos.string("img",300).notNullable()
        })
        console.log("tabla creada de productos")
       
    }
    catch(err){
        console.log(` error a crear la tabla de productos : ${err}`)
    }
}

module.exports = createTableProduct