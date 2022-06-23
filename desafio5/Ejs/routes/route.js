const { Router } = require(`express`)
const router = Router()

const product = []
let productExist = false

router.get(`/`, (req,res)=>{
    let page = "inicio"
    res.render("index" , {page})
})

router.get(`/formulario`, (req,res)=>{
    let page = "Formulario"
    res.render(`form`, {page})
})

router.get(`/productos`, (req , res)=>{
    let page = "productos"
    res.render("listProduct",{page, product , productExist})
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
    let page = "succes"
    res.render("succes",{page})
})

module.exports = router