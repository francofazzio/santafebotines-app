
import { Router } from "express";
const router = Router();
import productsRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";

router.get("/home", (req, res) => {
  try {
    res.send("Funciona y estás en home");
  } catch (error) {
    console.log("Hubo un error al accedor al home", error);
    res.sendStatus(500).send("Internal server error");
  }
});

router.use("/productos", productsRoutes);

router.use("/carrito/", cartRoutes);

export default router