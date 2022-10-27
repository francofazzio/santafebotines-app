import Router from "koa-router";
import productRouter from "./products.router.js"
const router = new Router({
    prefix: "/api"
})

router.use(productRouter.routes())

export default router