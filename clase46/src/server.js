import Koa from "koa"
import koaBody from "koa-body"
import router from "./routes/index.js"
import mongoose from "mongoose"


const app = new Koa()

//conexion a mongoAtlas
await mongoose.connect("mongodb+srv://franco1234@cluster0.oxbotfj.mongodb.net/?retryWrites=true&w=majority").then(console.log("Conectado a la base Mongo"))

app.use(koaBody())

app.use(router.routes())

app.use((ctx) => {
    ctx.response.status = 400
    ctx.body = {
        status: "Not found",
        message: "Route not found"
    }
})

const PORT = 8080

app.listen(PORT)
console.log(`Server listening http://127.0.0.1:${PORT}`)