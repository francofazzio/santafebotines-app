const {faker} = require ('@faker-js/faker')
const express = require ('express')
const { Router } = require ('express')
const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
router.get('/api/productos-test', (req, res) => {
    let cant = 5
    //console.log(cant)
    faker.locale ="es"
    let productos = []
    for(let i=0; i<cant; i++)
    {
        productos.push ({
            id: i+1,
            title:faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }
    res.json(productos)
})

module.exports = router