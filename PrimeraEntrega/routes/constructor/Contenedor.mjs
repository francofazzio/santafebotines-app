import fs from 'fs'

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
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
                return { mensaje: "el producto no existe" }
            }
        } catch (err) {
            console.log(`error en recuperar el objeto por id : ${err}`)
        }
    }
    o 
    async putById(id, newProduct) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objsFind = dataParse.filter((item) => item.id != id)
            newProduct.id = id
            objsFind.push(newProduct)
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
        } catch {
            console.log(`error al querer modificar el objeto por id : ${err}`)
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
            return { mensaje: "producto eliminado" }
        } catch (err) {
            console.log(`error en recuperar el objeto por id : ${err}`)
        }

    }
  
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, " ")
            return { msj: "contenido eliminado" }
        } catch (err) {
            console.log(` error : ${err}`)
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let cartFind = dataParse.find(item => item.id == id)
            cartFind.product = cartFind.product.filter((item) => item.id != id_prod)
            dataParse = [...dataParse, cartFind]
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataParse))
            return { msj: "producto eliminado " }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    async postProductById(id, product) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let cartFind = dataParse.find(item => item.id == id)
            cartFind.product.push(product)
            dataParse = [...dataParse, cartFind]
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataParse))
            return { msj: `producto añadido al carrito con id ${id}` }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }
}


export { Contenedor }