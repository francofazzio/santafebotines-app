import { ProductDAO } from "../DAO/productDAO.js"

const productDAO = ProductDAO.getInstance()

const getProduct = async ({id}) => {
    try {
        const product = await productDAO.getById(id)
        
        return product
    } catch (error) {
        console.log(error)
    }
}

const getProducts = async () => {
    try {
        const products = await productDAO.getAll()
        
        return products
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async ({datos}) => {
    try {
        const newProduct = {
            title: datos.title,
            description: datos.description,
            code: datos.code,
            thumbnail: datos.thumbnail,
            price: datos.price,
            stock: datos.stock
        }
        const createNewProduct = await productDAO.createProductGraphql(newProduct)

        return createNewProduct
    } catch (error) {
        console.log(error)
    }
}
export { getProduct, getProducts, createProduct }