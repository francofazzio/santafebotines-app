import { ProductDAO } from "../DAO/productDAO.js"
import { validateAdmin } from "../utils/adminValidation.js"
import logger from "../utils/logger.js"

const productDAO = ProductDAO.getInstance()

const getAllProductsController = async (req, res) => {
    try {
        const { email } = req.session
        const { cartId } = req.session
        const { avatar } = req.session
        const { role } = req.session
        //en este controller debo capturar el id de carrito del user para usarlo en el llamado a los metodos de cart.
        // console.log(req.user.username)
        // console.log(req.user._id)
        console.log("**********session.userId************",req.session.userId)
        console.log("----------session.cartId------------",req.session.cartId)
        
        const products = await productDAO.getAll()
        const plantilla = validateAdmin(role)

        // res.render(plantilla, { email, products, cartId, avatar })
        res.status(200).send(products)
    } catch (error) {
        logger.error(error)
    }
}

const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params
        const { cartId } = req.session
        const { email } = req.user
        const { avatar } = req.session
        const { role } = req.session
    
        const products = await productDAO.getById(id)
        const plantilla = validateAdmin(role)

        // res.render(plantilla, { email, products, cartId, avatar })
        res.status(200).send(products)
    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

const postNewProduct = async (req, res) => {
    try {
        const newProduct = req.body
        const { cartId } = req.session
        const { email } = req.user
        const { avatar } = req.session
        const { role } = req.session
    
        await productDAO.createDocument(newProduct)

        const products = await productDAO.getAll()
        
        const plantilla = validateAdmin(role)
        // res.render(plantilla, { email, products, cartId, avatar })

        res.status(201).send(products)

    } catch (error) {
        logger.error(error)
        res.redirect('/api/products/all')
    }
}

export { getAllProductsController, getOneProductController, postNewProduct }