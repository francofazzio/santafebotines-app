import Router from "koa-router";
import { getProductById, getProducts, postProduct } from "../controller/productController.js";

const router = new Router({
    prefix: "/products"
})

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", postProduct);


export default router