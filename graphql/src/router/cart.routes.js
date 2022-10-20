import { Router } from "express";
import { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete, cartControllerInsertProduct, cartControllerGetUserCart, cartControllerPurchase } from "../controller/cartController.js";

const router = Router()

router.get('/:id/products', cartControllerGet)

router.post('/:cart_id/product_id/:product_id', cartControllerInsertProduct )
router.get('/usercart', cartControllerGetUserCart)
router.post('/purchase', cartControllerPurchase)

router.post('/', cartControllerPost)
router.post('/:id/products', cartControllerProductsPost)
router.delete('/:id', cartControllerDelete)
router.delete('/:id/products/:id_prod', cartControllerProductDelete)


export default router