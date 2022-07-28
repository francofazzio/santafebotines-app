
import ContenedorFirebase from "../../contenedores/firebase.contenedores.js";


class ProductDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

export default ProductDaoFirebase;