const { Router } = require(`express`)
const router = Router()

const product = []
let productExist = false

router.get(`/`, (req,res)=>{
    let home = "inicio"
    res.render("index" , {home})
})

router.get(`/formulario`, (req,res)=>{
    let formulario = "Formulario"
    res.render(`form`, {formulario})
})

router.get(`/productos`, (req , res)=>{
    let namePage = "productos"
    res.render("listProduct",{namePage, product , productExist})
})


router.post(`/productos`, (req , res)=>{
    const {title , price , thumbnail  } = req.body
    const newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
    }
    productExist = true
    product.push(newProduct)
    res.render("succes")
})

module.exports = router