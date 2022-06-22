const { Router } = require(`express`)
const router = Router()
const product = []

class Inventary {
    constructor (p){
        this.product = p
    }
    async getAll(){
        return await this.product
    }
    async getByid(id){
        const productFind = this.product.find(i => i.id === id)
        const error = {error : "producto no encontrado"}
        if(!productFind){
            return error
        }else{
            return productFind
        }
    }
    static valor = 1
    
    async postProduct(obj){
        let newobj = {...obj , id : Inventary.valor}
        this.product.push(newobj)
        Inventary.valor++
        return newobj.id
    }

    async putProduct(id){
        const productFind = this.product.find(i => i.id === id)
        return productFind
    }

    async delete(id){
        const deleteProduct = this.product.filter(i => i.id != id)
        this.product.push(deleteProduct)
    }
}

const base = new Inventary (product)


router.get(`/productos`, (req , res)=>{
    base.getAll().then(r =>res.json(r))
})

router.get(`/productos/:id`, (req , res)=>{
    const id = Number(req.params.id)
    base.getByid(id).then(i => res.status(200).json(i))
})
router.post(`/productos`, (req , res )=>{
    const {title , price , thumbnail  } = req.body
    base.postProduct({title , price, thumbnail}).then(i => res.send({msg:`el id del producto agregado es  ${i}`}))
})

router.delete(`/productos/:id` ,(req , res)=>{
    const id = Number(req.params.id)
    base.delete(id).then(r => res.send({msg:`producto con id: ${id} borrado `}))
})

router.put(`/productos/:id` ,(req , res)=>{
    const id = Number(req.params.id)
    base.putProduct(id).then(r => res.json({msg: `producto con id: ${id} modificado`}))    
})


module.exports = router