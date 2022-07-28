import { Router } from "express";
const router = Router();

import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

import { checkAuthorization } from "../middlewares/middlewares.js";


router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", checkAuthorization, postProduct);
router.put("/:id", checkAuthorization, putProduct);
router.delete("/:id", checkAuthorization, deleteProduct);

//export
export default router;