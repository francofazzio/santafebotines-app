import { Router } from "express";
import productRouter from "./product.routes.js"
import cartRouter from "./cart.routes.js"
import userRouter from "./user.routes.js"
import infoRouter from "./info.routes.js"
import logger from '../utils/logger.js';
import { graphqlHTTP } from "express-graphql";
import { productSchema } from "../graphql/products.schema.js";
import { createProduct, getProduct, getProducts } from "../controller/product.graphql.controller.js";

const router = Router()

//Rutas Test-Info-Random
router.use("/", infoRouter)

//Rutas de User login-register
router.use("/user", userRouter)

//Rutas de Producto
router.use("/products", productRouter)

//Rutas de carritos
router.use("/carts", cartRouter)

//Graphql
router.use(
    "/graphql", 
    graphqlHTTP({
      schema: productSchema,
      rootValue: {
        getProduct: getProduct,
        getProducts: getProducts,
        createProduct: createProduct
      },
      graphiql: true
    })
  )


//Rutas '*'
router.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default router