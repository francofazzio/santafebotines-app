import express from "express"
import 'dotenv/config'
import routerProduct from "./routes/routesProduct.mjs"
import routerCart from "./routes/RoutesCart.mjs"
const puerto = process.env.PUERTO || 8000
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api",routerProduct)
app.use("/api",routerCart)


app.use(function(req, res, next){
    res.status(404).json({error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada`})
})


app.listen(puerto , ()=>{
    console.log("escuchando puerto 8080")  
})