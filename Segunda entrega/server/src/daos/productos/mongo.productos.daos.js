
import ContenedorMongo from "../../contenedores/mongo.contenedores.js";


class ProductDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      timestamp: { type: String, required: true },
      nombre: { type: String, required: true },
      description: { type: String, required: true },
      codigo: { type: String, required: true },
      url: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductDaoMongo;