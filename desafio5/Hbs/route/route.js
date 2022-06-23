const { Router } = require(`express`)
const router = Router()

const product = []
let productExist = false

router.get(`/`, (req,res)=>{
    res.render(`main`, {product})
})

router.get(`/form`, (req,res)=>{
    res.render(`formProduct`)
})

router.get(`/productos`, (req , res)=>{
    res.render("listProduct", {product , productExist})
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
    res.render(`succes`)
})

module.exports = router