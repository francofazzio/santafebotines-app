import { Router } from "express";
import { deleteOneProductController, getAllProductsController,getOneProductController, postNewProduct } from "../controller/productsController.js";
import { logginMiddleware } from "../middleware/logginMiddleware.js";

const router = Router()

router.get('/all', logginMiddleware, getAllProductsController)
router.get('/:id', logginMiddleware, getOneProductController)
router.post('/', logginMiddleware, postNewProduct )
router.post('/delete/:product_id', logginMiddleware, deleteOneProductController)

export default router