import { Cart } from "../models/cartModel.js"

let instance;

class CartDAO {
    constructor(){
        this.collection = Cart
    }

    async getById(id) {
        try {
            const doc = await Cart.find({ _id: id }, { products: 1, user:1, _id:0 })
            return doc[0]
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const doc = await Cart.find({})
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async getByUserId(userId){
        try {
            const doc = await Cart.findOne({ user: userId })
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async createDocument(userId){
        try {
            const doc = await Cart.insertMany({user: userId})
            return doc[0]._id
        } catch (error) {
            console.log(error)
        }
    }

    async updateDocument(id, paramsToUpdate){
        try {
            const doc = await Cart.updateOne({ _id: id }, {$set: paramsToUpdate})
            return "Documento actualizado en la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const doc = await Cart.deleteOne({ _id: id })
            return "Documento eliminado de la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductInCart(cartId, productId){
        try {
            const cart = await Cart.find({ _id: cartId })
            const productsInCar = cart[0].products
            const newCartProducts = productsInCar.filter( product => product.productId != productId )
    
            const doc = await Cart.updateOne({ _id: cartId }, { $set: { products : newCartProducts }} )
     
            return `Producto eliminado del carrito :)`
        } catch (error) {
            console.log(error)
        }
    }

    static getInstance() {
        if (!instance) {
          instance = new CartDAO();
        }
        return instance;
      }
}

export { CartDAO }