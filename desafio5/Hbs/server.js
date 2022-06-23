const express = require(`express`)
const app = express()
const rutas = require(`./route/route`)
const handlebars = require(`express-handlebars`).engine

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutDir: __dirname + "/views/layouts",
        partialDir: __dirname + "/views/partials"     
    })
);

app.set(`view engine`, `hbs`)
app.set(`views`, `./views`)
app.set(express.static("public"))

app.use(`/`, rutas)


app.listen(8080, ()=> {
    console.log(`escuchando puerto 8080 `)
})