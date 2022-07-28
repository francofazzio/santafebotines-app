
import ContenedorMongo from "../../contenedores/mongo.contenedores.js";


class CartDaoMongo extends ContenedorMongo {
  constructor() {
    super("compras", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

export default CartDaoMongo;