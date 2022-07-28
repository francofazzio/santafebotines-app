
import { Router } from "express";
const router = Router();

import {
  getNewCart,
  deleteCart,
  getCartProducts,
  postProductToCart,
  deleteProductFromCart,
} from "../controllers/cart.controllers.js";


router.get("/", getNewCart);
router.delete("/:id", deleteCart);
router.get("/:id/productos", getCartProducts);
router.post("/:id/productos", postProductToCart);
router.delete("/:id/productos/:id_prod", deleteProductFromCart);


export default router;