import { ProductDAO } from "../DAO/productDAO.js";

const productDAO = ProductDAO.getInstance()

const getProductById = async (ctx) => {
    try {
        const { id } = ctx.params    
        const product = await productDAO.getById(id)

        if(product){
            ctx.response.status = 200
            ctx.body = {
                status: "data obtained!",
                data: product
            }
        } else {
            ctx.response.status = 404
            ctx.body = {
                status: "Product not found",
                message: `Product with ID ${id} not found`
            }
        }
        console.log("CONTEXT:-----------", ctx.body)
    } catch (error) {
        console.log(error)
    }
}

const getProducts = async (ctx) => {
    try {
        const products = await productDAO.getAll()

        if(products.length > 0){
            ctx.response.status = 200
            ctx.body = {
                status: "Productos encontrados",
                message: products
            }
        } else {
            ctx.response.status = 404
            ctx.body = {
                status: "Products not found",
                message: "Didn't find products"
            }
        }
        console.log("CONTEXT:------", ctx.body)
    } catch (error) {
        console.log(error)
    }
}

const postProduct = async (ctx) => {
    const newProduct = ctx.request.body
    try {
        const postProduct = await productDAO.createDocument(newProduct)
        console.log("POSTPRODUCT---------", postProduct)

        if(postProduct){
            const products = await productDAO.getAll()
            
            ctx.response.status = 201
            ctx.body = {
                status: "Product added!",
                message: products
            }
        } else {
            ctx.response.status = 409
            ctx.body = {
                message: "Can't add the new product"
            }
        }
        console.log("CONTEXT:-----------",ctx.body)
    } catch (error) {
        console.log(error)
    }

}

export { getProductById, getProducts, postProduct }