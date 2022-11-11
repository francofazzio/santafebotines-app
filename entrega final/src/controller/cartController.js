import { CartDAO } from "../DAO/cartDAO.js";
import { ProductDAO } from "../DAO/productDAO.js";
import logger from "../utils/logger.js";
import { mailOptions, transporter } from "../utils/nodemailer.js";
import { smsClient, smsOptions } from "../utils/twilioSms.js";
import { whatsappClient, whatsappOptions } from "../utils/twilioWatsapp.js";

const productDAO = ProductDAO.getInstance()
const cartDAO = CartDAO.getInstance()

const cartControllerGet = async (req, res) => {
    try {
        const idCart = req.params.id
        const cartResponse = await cartDAO.getById(idCart)

        res.send(cartResponse)
    } catch (error) {
        logger.error(error)
    }
}

const cartControllerInsertProduct = async (req, res) => {
    try {
       
        const cartId = req.params.cart_id
        const productId = req.params.product_id

        
        
        const cartToUpdate = await cartDAO.getById(cartId)

       
        const existingProductInCart = cartToUpdate.products.find( product => product.productId == productId )
        
        
        if(existingProductInCart) {
            existingProductInCart.quantity += 1
        } else {
            cartToUpdate.products.push({
                productId: productId,
                quantity: 1
            })
        }

      
        await cartDAO.updateDocument(cartId, cartToUpdate)
        logger.info(`Producto ${productId} agregado al carrito`)

        res.redirect("/api/user/login")

    } catch (error) {
        logger.error(error)
    }
}

const cartControllerGetUserCart = async (req, res) => {
    try {
        const { products } = await cartDAO.getByUserId(req.session.userId)
            
            const ProductsPromises = await products.map( async (product) => {
                const productData = await productDAO.getById(product.productId)
                return {
                    productId : productData._id,
                    title : productData.title,
                    thumbnail : productData.thumbnail,
                    price : productData.price,
                    quantity : product.quantity,
                    total : productData.price * product.quantity
                }
            })

            const productsInCart = await Promise.all(ProductsPromises)

            req.session.productsInCart = productsInCart
            
        res.render("plantillaCart.ejs", { productsInCart })
    } catch (error) {
        logger.error(error)
    }
}

const cartControllerPurchase = async (req, res) => {
    try {
        //enviamos mail al admin
        mailOptions.subject = `Nuevo pedido de ${req.session.user} (email: ${req.session.email})`
        mailOptions.html = `<h1>Nuevo pedido de ${req.session.user} (email: ${req.session.email})</h1>
        <h2>Prodcutos comprados:</h2>
        `

        req.session.productsInCart.forEach( product => {
            mailOptions.html +=(`
            <br>
            <ul>title: ${product.title}</ul>
            <ul>productId: ${product.productId}</ul>
            <ul>price: ${product.price}</ul>
            <ul>quantity: ${product.quantity}</ul>
            <ul>total: ${product.total}</ul>
            <br>
            `)
        })
        
        await transporter.sendMail(mailOptions)
        

       
        whatsappOptions.body = `
        Nuevo pedido de ${req.session.user} (email: ${req.session.email})
        Prodcutos comprados:
        `
        req.session.productsInCart.forEach( product => {
            whatsappOptions.body +=(`
                title: ${product.title}
                productId: ${product.productId}
                price: ${product.price}
                quantity: ${product.quantity}
                total: ${product.total}
            `)
        })
        await whatsappClient.messages.create(whatsappOptions)
        
        
        smsOptions.body = `${req.session.user}, tu pedido se esta procesando :)`
        smsOptions.to = `+54${req.session.phoneNumber}`

        await smsClient.messages.create(smsOptions)

      
        req.session.productsInCart = []
        const cartId = req.session.cartId
        const cartToUpdate = await cartDAO.getById(cartId)
        cartToUpdate.products = req.session.productsInCart
        await cartDAO.updateDocument(cartId, cartToUpdate)

       
        res.redirect("/api/user/login")
    } catch (error) {
        logger.error(error)
    }
}

const cartControllerPost = async (req, res) => {
    try {
        const cartResponse = await cartDAO.createDocument()

        res.send(`Carrito insertado en la base con id: ${cartResponse} :)`)
    } catch (error) {
        logger.error(error)
    }
}

const cartControllerProductsPost = async (req, res) => {
    try {
        const cartId = req.params.id
        const bodyCart = req.body

        const cartResponse = await cartDAO.updateDocument(cartId, bodyCart)

        res.send(cartResponse)

    } catch (error) {
        logger.error(error)
    }
}

const cartControllerDelete = async (req, res) => {
    try {
        const cartId = req.params.id
        const cartResponse = await cartDAO.deleteById(cartId)

        res.send(cartResponse)
    } catch (error) {
        logger.error(error)
    }
}

const cartControllerProductDelete = async (req, res) => {
    try {
        const { cartId } = req.session
        const { productId } = req.params
        
        logger.info(`Producto con id ${productId} eliminado del carrito`)

        await cartDAO.deleteProductInCart(cartId, productId)
        res.redirect('/api/carts/usercart')
        
    } catch (error) {
        logger.error(error)
    }
}

export { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete, cartControllerInsertProduct, cartControllerGetUserCart, cartControllerPurchase }