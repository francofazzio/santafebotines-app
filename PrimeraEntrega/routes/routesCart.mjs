import { Router } from "express";
import { createCar , deleteCarrito , getProductByCar, deleteProducByCar , postProduct } from "./controlers/clienteControlers.mjs";
const routerCart = Router()


routerCart.post(`/carrito/`, createCar ) 
routerCart.delete(`/carrito/:id`, deleteCarrito) 
routerCart.get(`/carrito/:id/productos`, getProductByCar) 
routerCart.post(`/carrito/:id/productos`, postProduct)
routerCart.delete(`/carrito/:id/productos/:id_prod`, deleteProducByCar) 




export default routerCart