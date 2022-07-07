import { Contenedor } from "../constructor/Contenedor.mjs"
import { newFile as newFileProduct} from "./ProductsControlers.mjs" 

const newFile = new Contenedor("carrito.txt")


const createCar = (req, res) =>{
    let { title, price, img, descripcion, codigo, precio, stock } = req.body
    let newCarrito = {
        tiempo: new Date().toLocaleString(),

        product : {
            title,
            price,
            img,
            descripcion,
            codigo,
            precio,
            stock,
            hora: new Date().toLocaleString()}
    }
    newFile.save(newCarrito).then(i => res.send(`el id del carrito creado es ${i}`))
}

const deleteCarrito = (req , res)=>{
    const id = Number(req.params.id)
    newFile.deleteById(id).then(r => res.send(r))
}



const getProductByCar = (req , res) =>{
    const id = Number(req.params.id)
    newFile.getbyId(id).then(i => res.send(i.product))
}


const postProduct = async (req , res)=>{
    const id = Number(req.params.id)
    const idCart = Number(req.body.id)
    let product = await newFileProduct.getbyId(id)
    newFile.postProductById(idCart, product).then(r => res.send(r))
}


const deleteProducByCar = (req , res)=>{
    const id = Number(req.params.id)
    const idProduct = Number(req.params.id_prod)
    newFile.deleteProduct(id,idProduct).then(r => res.send(r))
}



export {createCar , deleteCarrito, getProductByCar , deleteProducByCar , postProduct}