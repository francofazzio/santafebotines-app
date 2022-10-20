import { Router } from "express";
import { productsTest } from "../controller/testController.js";
import { infoController } from '../controller/infoController.js';
import { randomsController } from '../controller/randomsController.js';

const router = Router()

router.get('/products-test', productsTest)
router.get('/info', infoController)
router.get('/randoms', randomsController)
router.get("/hola", (req, res) => {
    res.send("hoola".repeat(1000000))
})

export default router