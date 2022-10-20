import { Product } from "../models/productsModel.js"
import { BaseRepository } from "./BaseRepository.js";

let instance;

class ProductDAO extends BaseRepository {
    constructor(Product){
        super(Product)
    }
    
    async getById(id) {
        try {
            const doc = await Product.findOne( { _id: id } )
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const doc = await Product.find({})
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async createDocument(document){
        try {
            const doc = await Product.insertMany(document)
            return doc[0]._id
        } catch (error) {
            console.log(error)
        }
    }

    async createProductGraphql(document){
        try {
            const doc = await Product.insertMany(document)
            return doc[0]
        } catch (error) {
            console.log(error)
        }
    }

    async updateDocument(id, paramsToUpdate){
        try {
            const doc = await Product.updateOne({ _id: id }, {$set: paramsToUpdate})
            return "Documento actualizado en la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const doc = await Product.deleteOne({ _id: id })
            return "Documento eliminado de la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    static getInstance() {
        if (!instance) {
          instance = new ProductDAO();
        }
        return instance;
      }
}

export { ProductDAO }