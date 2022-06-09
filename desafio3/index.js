const fs = require('fs')

class Contenedor{
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    
    save(objeto){
        
        let productos= []
        const leer = async ()=>{
            try{
                let resultado = await fs.promises.readdir('./') 
                let existe = resultado.find(archivo => archivo === this.nombreDeArchivo)
                if(existe){
                    let desdeArchivo = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
                    if (desdeArchivo === ''){return nuevo()}
                    let archivoParseado = JSON.parse(desdeArchivo)
                    productos=archivoParseado
                    if(productos.length > 0){
                        let ultimo = productos.length-1
                        let objectId= productos[ultimo].id
                        objeto.id = objectId+1
                        }else {
                            objeto.id = 0
                        }
                    productos.push(objeto)
                    await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(productos))
                    return objeto.id
                }else{
                    return  nuevo()
                }
            }catch (error){
                console.log(`hubo un error en save existente: ${error}`)
            } 
        }
        
        const nuevo = async()=>{
            try{
                objeto.id = 0
                productos.push(objeto)
                await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(productos))
                return objeto.id
            }catch (error){
                console.log(`hubo un error en save nuevo: ${error}`)
            } 
            
        }
        
        return  leer()
    }


    async getById(Number){
        try {
            let desdeArchivo = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let archivoParseado = JSON.parse(desdeArchivo)
            let encontrado = archivoParseado.find(object =>object.id === Number)
            if (encontrado){
                return encontrado
            }else{
                return null
            }
        } catch(error) {
            console.log(`Hubo un error en getById ${error}`)
        }
    } 
    async getAll(){
        try {
            let desdeArchivo = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            return JSON.parse(desdeArchivo)
        } catch(error) {
            console.log(`Hubo un error en getAll ${error}`)
        }
    } 
    async deleteById(Number){
        try {
            let desdeArchivo = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let archivoParseado = JSON.parse(desdeArchivo)
            let filtrado = archivoParseado.filter(object =>object.id !== Number)
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(filtrado))
        } catch(error) {
            console.log(`Hubo un error  en deleteById ${error}`)
        }
    } 
    async deleteAll(Number){
        try {
            await fs.promises.writeFile(this.nombreDeArchivo, '')
        } catch(error) {
            console.log(`Hubo un error  en deleteById ${error}`)
        }
    } 

}

const productos = new Contenedor ("productos.txt")



//---------------------------------------------------------------------*
const express = require('express')
const app = express()
const puerto = 8080

let todos = []
app.use((req,res,next)=>{
    productos.getAll().then((r)=>(todos=r))
    next()
})
app.get('/productos', (req,res)=>{
    res.json(todos)
})

app.get('/productoRandom', (req,res)=>{
    const numeroAleatorio =  Math.floor((Math.random() * (todos.length - 0 + 1)) + 0);
    res.json(todos[numeroAleatorio])

})


app.listen(puerto,(error)=>{
    if (error){
        return console.log(`el servidor tiene un error ${error}`)
    }
    console.log(`el servidor se inicio en el puerto ${puerto}`)
})