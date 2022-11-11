import { User } from "../models/userModel.js"

let instance;

class UserDAO {
    constructor(){
        this.collection = User
    }

    async getById(id) {
        try {
            const doc = await User.find( { _id: id } )
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(username) {
        try {
            const doc = await User.findOne({ username })
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const doc = await User.find({})
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async createDocument(document){
        try {
            const doc = await User.insertMany(document)
            return doc[0]._id
        } catch (error) {
            console.log(error)
        }
    }

    async updateDocument(email, paramsToUpdate){
        try {
            const doc = await User.updateOne({ email: email  }, {$set: paramsToUpdate})
            return "Documento actualizado en la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUserByEmail(email){
        try {
            const doc = await User.deleteOne({ email: email })
            return "Usuario eliminado de la base :)"
        } catch (error) {
            console.log(error)
        }
    }

    static getInstance() {
        if (!instance) {
          instance = new UserDAO();
        }
        return instance;
      }
}

export { UserDAO }