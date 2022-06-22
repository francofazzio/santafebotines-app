const express = require(`express`)
const app = express()
const rutas = require(`./rutas/rutas`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get(`/app`, (req , res ) => {
    res.sendFile(__dirname + `/public/index.html`)
})

app.use(`/app`,rutas)


app.listen(8080, ()=> {
    console.log(`escuchando puerto 8080 `)
})