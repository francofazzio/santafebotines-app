import { Router } from "express";

const router = Router()

router.get("/", (req , res)=>{
    let page = "inicio"
    let userLog = true
    res.render("index" , {page, userLog})
})


export default router