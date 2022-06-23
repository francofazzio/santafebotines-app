const express = require(`express`)
const app = express()
const path = require('path')
const rutas = require(`./routes/route`)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.set(express.static(path.join(__dirname, "public")))

app.use(`/`, rutas)


app.listen(8080, ()=> {
    console.log(`escuchando puerto 8080 `)
})