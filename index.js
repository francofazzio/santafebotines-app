const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        async function createFile() {
            try {
                await fs.promises.writeFile(`${fileName}`, "")
                console.log("archivo Creado ")
            } catch (err) {
                console.log(`hubo un error : ${err}`)
            }
        }
        createFile()
    }
   
    async save(obj) {
        try {
            let inventary = await fs.promises.readFile(`${this.fileName}`, 'utf-8')
            console.log(inventary)
            if (!inventary) {
                obj.id = 1
                const arrObjs = [obj]
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(arrObjs))
                return obj.id
            } else {
                inventary = JSON.parse(inventary);
                obj.id = inventary[inventary.length - 1].id + 1
                inventary.push(obj)
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(inventary))
                return obj.id
            }
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }
  

    async getbyId(id) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objFind = dataParse.find(item => item.id == id)
            if (objFind) {
                return objFind
            } else {
                return null
            }

        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }
    }
  
    async getAll() {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let inventaryParse = JSON.parse(inventary)
            return inventaryParse
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

   
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let objsFind = dataParse.filter((item) => item.id != id)
            fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
            console.log(`objeto con id : ${id} borrado`)
        } catch (err) {
            console.log(`hubo un error con id : ${err}`)
        }

    }
   
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, " ")
            console.log("contenido Borrado")
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }
}

const newFile = new Contenedor("./productos.txt")

async function cargarProductos (){
    await newFile.save({ title: "botin rojo", price: 7000, thumbnail: "https://cdn.solodeportes.com.ar/media/catalog/product/cache/baa193a472891718a9656a0f6c3cd266/b/o/botines-de-futbol-adidas-predator-freak-3-fg-roja-100010fy6279001-1.jpg" })
    await newFile.save({ title: "botin azul", price: 10000, thumbnail: "https://sportotalar.vteximg.com.br/arquivos/ids/216596-400-400/AT7949-414-14028-Azul_1.jpg?v=637371823806770000" })
    await newFile.save({ title: "botin naranja", price: 9000, thumbnail: "https://i.pinimg.com/originals/b3/bb/37/b3bb37561d8b10fd4e29bd78c67d7c5f.jpg"})
}

cargarProductos()

const express = require("express")
const app = express()
const puerto = 8080

app.get(`/`, (req , res)=>{
    res.send("santa fe botines")
})
app.get(`/productos`, (req , res)=>{
    newFile.getAll().then(i=> res.json(i))
})
app.get(`/productosRandom`, (req , res)=>{
    let numAleatorio = (Math.floor(Math.random() * (4 - 0)))
    newFile.getbyId(numAleatorio)
    .then(i=>{ 
        res.json(i)
        console.log(numAleatorio)})
})

app.listen(puerto , ()=>{
    console.log(`servidor escuchando puerto: ${puerto}`)
})