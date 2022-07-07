import { Router } from "express";
import { getProduct , addProduct , deleteProduct , putProduct } from "./controlers/ProductsControlers.mjs";

const routerProduct = Router()
const administrador = true

const acess = (req , res , next) =>{
    if(administrador == true){
        next()
    }else{
        res.send({error : -1, descripcion: `ruta ${req.path} `, metodo : `${req.metod} no autorizada`})
    }
}


routerProduct.get(`/productos/:id?`, getProduct)
routerProduct.post(`/productos/`,acess ,addProduct)
routerProduct.put("/productos/:id",acess, putProduct)
routerProduct.delete(`/productos/:id`,acess,  deleteProduct)


export default routerProduct