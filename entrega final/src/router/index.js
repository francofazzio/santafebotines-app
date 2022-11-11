import { Router } from "express";
import productRouter from "./product.routes.js"
import cartRouter from "./cart.routes.js"
import userRouter from "./user.routes.js"
import infoRouter from "./info.routes.js"
import logger from '../utils/logger.js';

const router = Router()


router.use("/", infoRouter)


router.use("/user", userRouter)


router.use("/products", productRouter)


router.use("/carts", cartRouter)

router.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default router