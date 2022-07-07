import { Contenedor } from "../constructor/Contenedor.mjs"

const newFile = new Contenedor("productos.txt")


const getProduct = (req, res) => {
    const id = Number(req.params.id)
    if (id) {
        try {
            newFile.getbyId(id).then(i => res.json(i))
        } catch (err) {
            console.log(`ocurrio un error ${err}`)
        }
    } else {
        try{
            newFile.getAll().then(i => res.json(i))
        }catch{
            console.log(`ocurrio un error ${err}`)
        }
    }
}

const addProduct = (req, res) => {
    let { title, price, img, descripcion, codigo, precio, stock } = req.body
    let newProduct = {
        title,
        price,
        img,
        descripcion,
        codigo,
        precio,
        stock,
        tiempo: new Date().toLocaleString(),
    }
    newFile.save(newProduct).then(i => res.send({ msg: `el id del productoes  ${i}` }))
}

const putProduct = (req, res) => {
    const id = Number(req.params.id)
    let { title, price, img, descripcion, codigo, precio, stock } = req.body
    let newProduct = {
        title,
        price,
        img,
        descripcion,
        codigo,
        precio,
        stock,
        tiempo: new Date().toLocaleString(),
    }
    newFile.putById(id,newProduct)
}

const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    newFile.delete(id).then(r => res.send(r))
}

export { getProduct, addProduct, deleteProduct, putProduct, newFile }